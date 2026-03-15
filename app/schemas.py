from pydantic import BaseModel, Field

class PatientData(BaseModel):
    age: str
    tumor_size: str = Field(..., alias="tumor-size")
    menopause: str = Field(..., alias="menopause")
    inv_nodes: str = Field(..., alias="inv-nodes")
    node_caps: str = Field(..., alias="node-caps")
    deg_malig: int = Field(..., alias="deg-malig")
    breast: str
    breast_quad: str = Field(..., alias="breast-quad")
    irradiat: str
    class Config:
        populate_by_name = True

class PredictionResponse(BaseModel):
    prediction: str
