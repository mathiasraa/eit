from flask import Flask 
from types import SimulationFeatures


app = Flask(__name__)

@app.route("/startGame")
def start_game():
    return '', 204

@app.route("/simulate", methods=["POST"])
def simulate_earthquake(simulation_features: SimulationFeatures):
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)

