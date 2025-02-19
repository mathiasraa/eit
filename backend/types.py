from enum import Enum
from typing import TypedDict, List

class FoundationType(str, Enum):
    MUD_MORTAR_STONE_BRICK = "mud_mortar_stone_brick"
    BAMBOO_TIMBER = "bamboo_timber"
    CEMENT_STONE_BRICK = "cement_stone_brick"
    REINFORCED_CONCRETE = "reinforced_concrete"
    OTHER = "other"

class SuperstructureType(str, Enum):
    ADOBE_MUD = "adobe_mud"
    MUD_MORTAR_STONE = "mud_mortar_stone"
    STONE_FLAG = "stone_flag"
    CEMENT_MORTAR_STONE = "cement_mortar_stone"
    MUD_MORTAR_BRICK = "mud_mortar_brick"
    CEMENT_MORTAR_BRICK = "cement_mortar_brick"
    TIMBER = "timber"
    BAMBOO = "bamboo"
    RC_NON_ENGINEERED = "rc_non_engineered"
    RE_ENGINEERED = "re_engineered"
    OTHER = "other"

class SimulationFeatures(TypedDict):
    num_floors: int
    foundation_type: FoundationType
    superstructure_type: List[SuperstructureType]
    age: int
    plinth_area: float