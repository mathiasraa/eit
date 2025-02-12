import kagglehub


def Import_data():
    path = kagglehub.dataset_download("arashnic/earthquake-magnitude-damage-and-impact")
    print("Path to dataset files:", path)
    return path