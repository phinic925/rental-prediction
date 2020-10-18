# Importing necessary libraries
import pandas as pd
from flask import Flask, request, make_response
import json
import pickle
from renting_houses.RentPrices import RentPrices
from flask_cors import CORS

# load model
model = pickle.load(open("model/house_model.pkl", "rb"))

# processing the request from dialogflow


def processRequest(req, params_only=False):
    result = req.get("queryResult")

    def ace_animal(x):
        x = x.lower()
        if x == "sim":
            animal = "acept"
        elif x == "não":
            animal = "not acept"

        return animal

    def furn(x):
        x = x.lower()

        if x == "sim":
            fur = "furnished"
        elif x == "não":
            fur = "not furnished"
        return fur

    # Fetching the data points
    parameters = result.get("parameters")
    city = parameters.get("city").title()
    area = parameters.get("area")
    rooms = parameters.get("rooms")
    bathroom = parameters.get("bathroom")
    parkings = parameters.get("parkings")
    floor = parameters.get("floor")
    animal = ace_animal(parameters.get("animal"))
    furniture = furn(parameters.get("furniture"))
    hoa = parameters.get("hoa")
    tax = parameters.get("tax")
    fire = parameters.get("fire")
    values = [
        city,
        area,
        rooms,
        bathroom,
        parkings,
        floor,
        animal,
        furniture,
        hoa,
        tax,
        fire,
    ]

    # Dumping the data into an array
    keys = [
        "city",
        "area",
        "rooms",
        "bathroom",
        "parking spaces",
        "floor",
        "animal",
        "furniture",
        "hoa (R$)",
        "property tax (R$)",
        "fire insurance (R$)",
    ]

    final_features = dict(zip(keys, values))

    # Fitting out model with the data points
    df_raw = pd.DataFrame([final_features])
    pipeline = RentPrices()

    # data preparation
    df1 = pipeline.data_preparation(df_raw)

    # prediction
    prediction = model.predict(df1)

    # Returning back the fullfilment text back to DialogFlow
    fulfillmentText = "O valor total estimado do aluguel de sua casa, incluindo condomínio e taxas, é: R$ {:.2f} !".format(
        prediction[0] + hoa + tax + fire
    )

    # log.write_log(sessionID, "Bot Says: "+fulfillmentText)
    return {"fulfillmentText": fulfillmentText}


# instanciate flask
app = Flask(__name__)
CORS(app)


@app.route("/rentalparameters", methods=["POST"])
def rentalparameters():
    req = request.get_json()
    res = processRequest(req, params_only=True)
    res = json.dumps(res, indent=4)
    print(res)
    r = make_response(res)
    r.headers["Content-Type"] = "application/json"
    print(r)
    return r


if __name__ == "__main__":
    app.run(debug=True, port=5000)
