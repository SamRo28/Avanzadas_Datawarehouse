from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from . import services, schemas, database

router = APIRouter(
    prefix="/statistics",
    tags=["statistics"]
)

@router.get("/blue-ocean", response_model=List[schemas.BlueOceanItem])
def read_blue_ocean(db: Session = Depends(database.get_db)):
    return services.get_blue_ocean(db)

@router.get("/battle-royale-lifecycle", response_model=List[schemas.BattleRoyaleLifecycleItem])
def read_battle_royale_lifecycle(db: Session = Depends(database.get_db)):
    return services.get_battle_royale_lifecycle(db)

@router.get("/indie-success", response_model=List[schemas.IndieSuccessItem])
def read_indie_success(db: Session = Depends(database.get_db)):
    return services.get_indie_success(db)

@router.get("/price-elasticity", response_model=List[schemas.PriceElasticityItem])
def read_price_elasticity(db: Session = Depends(database.get_db)):
    return services.get_price_elasticity(db)

@router.get("/cost-quality", response_model=List[schemas.CostOfQualityItem])
def read_cost_of_quality(db: Session = Depends(database.get_db)):
    return services.get_cost_of_quality(db)

@router.get("/f2p-vs-premium", response_model=List[schemas.F2PvsPremiumItem])
def read_f2p_vs_premium(db: Session = Depends(database.get_db)):
    return services.get_f2p_vs_premium(db)

@router.get("/visual-assets-impact", response_model=List[schemas.VisualAssetsImpactItem])
def read_visual_assets_impact(db: Session = Depends(database.get_db)):
    return services.get_visual_assets_impact(db)

@router.get("/copywriting-seo", response_model=List[schemas.CopywritingSEOItem])
def read_copywriting_seo(db: Session = Depends(database.get_db)):
    return services.get_copywriting_seo(db)

@router.get("/multi-platform", response_model=List[schemas.MultiPlatformItem])
def read_multi_platform(db: Session = Depends(database.get_db)):
    return services.get_multi_platform_effect(db)

@router.get("/overhype-analysis", response_model=List[schemas.OverhypeItem])
def read_overhype_analysis(db: Session = Depends(database.get_db)):
    return services.get_overhype_analysis(db)

@router.get("/accessibility-hardware", response_model=List[schemas.AccessibilityHardwareItem])
def read_accessibility_hardware(db: Session = Depends(database.get_db)):
    return services.get_accessibility_hardware(db)

@router.get("/dev-support", response_model=List[schemas.DevSupportItem])
def read_dev_support(db: Session = Depends(database.get_db)):
    return services.get_dev_support(db)

@router.get("/publisher-success", response_model=List[schemas.PublisherSuccessItem])
def read_publisher_success(db: Session = Depends(database.get_db)):
    return services.get_publisher_success(db)

@router.get("/specialization-generalist", response_model=List[schemas.SpecializationItem])
def read_specialization_generalist(db: Session = Depends(database.get_db)):
    return services.get_specialization_generalist(db)

@router.get("/decade-evolution", response_model=List[schemas.DecadeEvolutionItem])
def read_decade_evolution(db: Session = Depends(database.get_db)):
    return services.get_decade_evolution(db)
