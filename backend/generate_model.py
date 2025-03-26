import pandas as pd
import numpy as np
import os
import numpy as np
from sklearn.model_selection import train_test_split
import shap
from collections import Counter
from imblearn.over_sampling import SMOTE
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
import numpy as np
from sklearn.preprocessing import QuantileTransformer
import joblib
from lib.lib import Import_data

print("Importing data...")
path = Import_data()
# get all files in the directory
files = os.listdir(path)
print(files)

print("Loading data into memory...")
building_structure = pd.read_csv(path + "/csv_building_structure.csv")
dmg_assesment = pd.read_csv(path + "/csv_building_damage_assessment.csv")

print("Pre Processing data...")
dmg_assesment = dmg_assesment.drop(columns=[col for col in dmg_assesment.columns if 'has_geotechnical_risk_' not in col and col != 'building_id'])

building_structure = building_structure.merge(dmg_assesment, on='building_id')

building_structure = building_structure.drop(columns=[col for col in building_structure.columns if 'id' in col or 'post_eq' in col or 'technical_solution_proposed' in col in col])

building_structure = building_structure[building_structure["count_floors_pre_eq"] < 6]

building_structure = building_structure[building_structure["plinth_area_sq_ft"] <= 1500]

building_structure["damage_grade"] = building_structure["damage_grade"].replace({"Grade 1": 0, "Grade 2": 1, "Grade 3": 2, "Grade 4": 3, "Grade 5": 4})

# Translating category columns to category type for native category support
categorical_columns = [
    "land_surface_condition", 
    "foundation_type", 
    "roof_type", 
    "ground_floor_type",
    "other_floor_type",
    "plan_configuration",
]

for col in categorical_columns:
    building_structure[col] = building_structure[col].astype('category')

building_structure = building_structure.dropna()

categorical_columns = [
    # 'land_surface_condition', 
    'foundation_type', 
    'roof_type', 
    'ground_floor_type', 
    'other_floor_type', 
    'position'
    #'plan_configuration'
]

building_structure["height_plinth_ratio"] = building_structure["height_ft_pre_eq"] / building_structure["plinth_area_sq_ft"]
building_structure = building_structure[building_structure["height_plinth_ratio"] < 0.3]

# I want to combine these: 'roof_type_Bamboo/Timber-Heavy roof', 'roof_type_Bamboo/Timber-Light roof'
# They are both in the roof type column. Create a new category thats called Bamboo/Timber
building_structure["roof_type"] = building_structure["roof_type"].replace({"Bamboo/Timber-Heavy roof": "Bamboo/Timber", "Bamboo/Timber-Light roof": "Bamboo/Timber"})

to_drop = [
    "damage_grade",
    "plinth_area_sq_ft",
    "height_ft_pre_eq",
    "plan_configuration",
    "land_surface_condition",
    #"position",
    #"count_floors_pre_eq",
]

# Use pandas get_dummies function to one-hot encode
X = pd.get_dummies(
    building_structure.drop(columns=to_drop), 
    columns=categorical_columns,
    drop_first=False,  # Set to True if you want to avoid multicollinearity
    prefix=categorical_columns,
    prefix_sep='_'
)

keys = X.keys()
X = X.to_numpy()

y = building_structure["damage_grade"].astype("Int64").to_numpy()
# y 0 is 0, 1 is 1, 2 is 1, 3 is 1, 4 is 2
y = np.where(y == 0, 0, np.where(y == 1, 1, np.where(y == 2, 1, np.where(y == 3, 1, 2))))

X_train, X_temp, y_train, y_temp = train_test_split(X, y, test_size=0.3, random_state=42)
X_val, X_test, y_val, y_test = train_test_split(X_temp, y_temp, test_size=0.5, random_state=42)

print("Over sampling data...")
print("Original training distribution:", Counter(y_train))
smote = SMOTE(random_state=42)
X_train, y_train = smote.fit_resample(X_train, y_train)
print("Sampled training distribution:", Counter(y_train))

print("Training model...")
# now do a random forest regressor

reg = RandomForestRegressor(n_estimators=50, random_state=42)
reg.fit(X_train, y_train)
y_pred = reg.predict(X_test)
print(mean_squared_error(y_test, y_pred))


print("Creating transformer for data normilization...")
y_pred_test = y_pred

# y_pred_test should be a NumPy array
y_pred_test = np.array(y_pred_test).reshape(-1, 1)  # Ensure it's 2D for the transformer

# QuantileTransformer with uniform output distribution
qt = QuantileTransformer(n_quantiles=1000, output_distribution='uniform', random_state=42)
qt.fit(y_pred_test)

print("Generating shap explainer...")
explainer = shap.TreeExplainer(reg)

print("Saving model...")
joblib.dump({
    'model': reg,
    'transformer': qt,  # if you're using one
    'feature_names': keys,
    'shap_explainer': explainer
}, 'rf_bundle.pkl')

print("Done")