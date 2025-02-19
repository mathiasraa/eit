from flask import Flask
from flask_cors import CORS 
from flask import request
import numpy as np
from .lib.sim_types import FoundationType, SimulationFeatures, SuperstructureType
import joblib
import os

app = Flask(__name__)
print("HEI")
print("Current directory: ", os.getcwd())
# sklearn MLPCLASSIFIER
model = joblib.load("./src/eit/model.pkl")

features = [
    "count_floors_pre_eq",
    "age_building",
    "plinth_area_sq_ft",
    "has_superstructure_adobe_mud",
    "has_superstructure_mud_mortar_stone",
    "has_superstructure_stone_flag",
    "has_superstructure_cement_mortar_stone",
    "has_superstructure_mud_mortar_brick",
    "has_superstructure_cement_mortar_brick",
    "has_superstructure_timber",
    "has_superstructure_bamboo",
    "has_superstructure_rc_non_engineered",
    "has_superstructure_rc_engineered",
    "has_superstructure_other",
    "foundation_type_Bamboo/Timber",
    "foundation_type_Cement-Stone/Brick",
    "foundation_type_Mud mortar-Stone/Brick",
    "foundation_type_Other",
    "foundation_type_RC",
    "plan_configuration_Building with Central Courtyard",
    "plan_configuration_E-shape",
    "plan_configuration_H-shape",
    "plan_configuration_L-shape",
    "plan_configuration_Multi-projected",
    "plan_configuration_Others",
    "plan_configuration_Rectangular",
    "plan_configuration_Square",
    "plan_configuration_T-shape",
    "plan_configuration_U-shape"  
]

CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000"],
        "methods": ["GET", "POST"],
        "allow_headers": ["Content-Type"]
    }
})


# Health check endpoint
@app.route("/health")
def health():
    return "OK", 200

@app.route("/startGame")
def start_game():
    return '', 204


@app.route("/simulate", methods=["POST"])
def simulate_earthquake():
    simulation_features = request.get_json()["simulation_features"]
    print(simulation_features)

    typed_simulation_features = SimulationFeatures(**simulation_features)

    superstructure_flags_from_simulation = np.array([
        1 if SuperstructureType.ADOBE_MUD in typed_simulation_features["superstructure_type"] else 0,
        1 if SuperstructureType.MUD_MORTAR_STONE in typed_simulation_features["superstructure_type"] else 0,
        1 if SuperstructureType.STONE_FLAG in typed_simulation_features["superstructure_type"] else 0,
        1 if SuperstructureType.CEMENT_MORTAR_STONE in typed_simulation_features["superstructure_type"] else 0,
        1 if SuperstructureType.MUD_MORTAR_BRICK in typed_simulation_features["superstructure_type"] else 0,
        1 if SuperstructureType.CEMENT_MORTAR_BRICK in typed_simulation_features["superstructure_type"] else 0,
        1 if SuperstructureType.TIMBER in typed_simulation_features["superstructure_type"] else 0,
        1 if SuperstructureType.BAMBOO in typed_simulation_features["superstructure_type"] else 0,
        1 if SuperstructureType.RC_NON_ENGINEERED in typed_simulation_features["superstructure_type"] else 0,
        1 if SuperstructureType.RE_ENGINEERED in typed_simulation_features["superstructure_type"] else 0,
        1 if SuperstructureType.OTHER in typed_simulation_features["superstructure_type"] else 0,
    ])

    foundation_flags_from_simulation = np.array([
        1 if FoundationType.BAMBOO_TIMBER in typed_simulation_features["foundation_type"] else 0,
        1 if FoundationType.CEMENT_STONE_BRICK in typed_simulation_features["foundation_type"] else 0,
        1 if FoundationType.MUD_MORTAR_STONE_BRICK in typed_simulation_features["foundation_type"] else 0,
        1 if FoundationType.OTHER in typed_simulation_features["foundation_type"] else 0,
        1 if FoundationType.REINFORCED_CONCRETE in typed_simulation_features["foundation_type"] else 0,
    ])


    plan_configuration_flags_from_simulation = [
        0, # plan_configuration_Building with Central Courtyard
        0, # plan_configuration_E-shape
        0, # plan_configuration_H-shape
        0, # plan_configuration_L-shape
        0, # plan_configuration_Multi-projected
        0, # plan_configuration_Others
        0, # plan_configuration_Rectangular
        1, # plan_configuration_Square
        0, # plan_configuration_T-shape
        0, # plan_configuration_U-shape
    ]

    input_vector = [[
        typed_simulation_features["num_floors"], # count_floors_pre_eq
        typed_simulation_features["age"], # age_building
        typed_simulation_features["plinth_area"], # plinth_area_sq_ft
        *superstructure_flags_from_simulation,
        *foundation_flags_from_simulation,
        *plan_configuration_flags_from_simulation,
    ]]

    damage_grade = model.predict(input_vector)
    print(damage_grade)

    # normalize the damage grade to be between 0 and 1 
    normalized_damage_grade = damage_grade[0] / 5

    return {
        "damage_grade": normalized_damage_grade,
        "feature_importance": {
           
        }
    }, 200

if __name__ == '__main__':
    app.run(host="localhost", port=8000, debug=True)

