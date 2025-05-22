# CSV export
import pandas as pd

def export_activities_to_csv(data, filename="activities.csv"):
    df = pd.DataFrame(data)
    df.to_csv(filename, index=False)
