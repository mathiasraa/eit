import kagglehub
def main():
    print("Hello from eit!")
    path = kagglehub.dataset_download("arashnic/earthquake-magnitude-damage-and-impact")
    print("Path to dataset files:", path)



if __name__ == "__main__":
    main()
