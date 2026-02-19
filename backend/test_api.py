import requests
import sys

BASE_URL = "http://localhost:8000/statistics"

endpoints = [
    "blue-ocean",
    "battle-royale-lifecycle",
    "indie-success",
    "price-elasticity",
    "cost-quality",
    "f2p-vs-premium",
    "visual-assets-impact",
    "copywriting-seo",
    "multi-platform",
    "overhype-analysis",
    "accessibility-hardware",
    "dev-support",
    "publisher-success",
    "specialization-generalist",
    "decade-evolution"
]

def test_endpoints():
    failed = False
    for endpoint in endpoints:
        url = f"{BASE_URL}/{endpoint}"
        try:
            print(f"Testing {url}...", end=" ")
            response = requests.get(url)
            if response.status_code == 200:
                print("OK")
                # print(response.json()[:1]) # Print first item for verification
            else:
                print(f"FAILED ({response.status_code})")
                print(response.text)
                failed = True
        except Exception as e:
            print(f"ERROR: {e}")
            failed = True
    
    if failed:
        sys.exit(1)

if __name__ == "__main__":
    test_endpoints()
