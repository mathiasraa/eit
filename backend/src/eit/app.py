from flask import Flask 
from .lib.sim_types import SimulationFeatures


app = Flask(__name__)

@app.route("/startGame")
def start_game():
    return '', 204

@app.route("/simulate", methods=["POST"])
def simulate_earthquake(simulation_features: SimulationFeatures):
    # Calculate damage grade based on weighted features
    # Weights represent relative importance of each feature
    weights = {
        'num_floors': 0.3,  # Taller buildings generally more vulnerable
        'age': 0.25,        # Older buildings more susceptible
        'plinth_area': 0.15,# Larger area can affect stability
        'foundation_type': {
            'mud_mortar_stone_brick': 0.8,
            'bamboo_timber': 0.9, 
            'cement_stone_brick': 0.5,
            'reinforced_concrete': 0.2,
            'other': 0.7
        },
        'superstructure_type': {
            'adobe_mud': 0.9,
            'mud_mortar_stone': 0.8,
            'cement_mortar_brick': 0.4,
            'rc_non_engineered': 0.6,
            're_engineered': 0.3,
            'other': 0.7
        }
    }

    # Calculate base score (0-1)
    score = 0
    score += min(simulation_features['num_floors'] * weights['num_floors'], 1)
    score += min((simulation_features['age'] / 50) * weights['age'], 1)
    score += min((simulation_features['plinth_area'] / 2000) * weights['plinth_area'], 1)
    score += weights['foundation_type'][simulation_features['foundation_type']]
    
    # Average the superstructure types if multiple
    superstructure_score = sum(weights['superstructure_type'][st] for st in simulation_features['superstructure_type'])
    score += superstructure_score / len(simulation_features['superstructure_type'])

    # Normalize and convert to damage grade (1-5)
    score = score / 5  # Normalize to 0-1 range
    damage_grade = min(max(round(score * 5), 1), 5)

    return {
        "damage_grade": damage_grade,
        "feature_importance": {
            "num_floors": weights['num_floors'],
            "age": weights['age'],
            "plinth_area": weights['plinth_area'],
            "foundation": weights['foundation_type'][simulation_features['foundation_type']],
            "superstructure": superstructure_score / len(simulation_features['superstructure_type'])
        }
    }, 200

if __name__ == '__main__':
    app.run(debug=True)

