# This is simple project in langgraph

Scope of this project is to make agentic-based workflow that will:

-   gather business needs from user
-   clarify all questions
-   create User Story and technical notes about implementations
-   create brief estimation of the story using planning poker

# How to use
clone repo
run `npm i`
replace your api key in main.ts with your key from OpenAI API
run `npx tsx main.ts` to run the code



# Example conversation


Write about task that you want to make:

Your answer: Please create python script that will process excel sheet and insert data into database

Could you please provide more details on the following aspects?

1. What specific data do you want to process from the Excel sheet?
2. What type of database are you using (e.g., MySQL, PostgreSQL, SQLite)?
3. What is the structure of the database table where the data will be inserted?
4. Are there any specific libraries or frameworks you would like to use for processing the Excel sheet or interacting with the database?
5. Should the script handle any errors or logging, and if so, how?
   
Your answer: I want to extract all fields, ingest it into PostgreSQL, data should be inserted into table my_data, columns in database should be created based on excel data. I don`t have any preferences regarding used libraries. Script should handle errors and logging (simple logging to cli). File will be saved as my_data.csv
   To summarize your requirements:

7. **Data Source**: Extract all fields from an Excel sheet (saved as `my_data.csv`).
8. **Database**: Insert the data into a PostgreSQL database.
9. **Table**: The data will be inserted into the table named `my_data`, and the columns in the database will be created based on the Excel data.
10. **Libraries**: No specific preferences for libraries to be used.
11. **Error Handling & Logging**: The script should handle errors and implement simple logging to the CLI.

Is there anything else you would like to add or modify?

Your answer: That looks good

    This is your user story:

    USER STORY
    __________
    User Story:

As a data engineer,  
I want to create a Python script that processes an Excel sheet and inserts data into a PostgreSQL database,  
So that I can automate the data ingestion process and ensure that the data structure in the database reflects the incoming data from the Excel sheet.

Technical Notes:

1. **Setup Environment**:

    - Ensure Python is installed on your system.
    - Install the required libraries using pip:
        ```bash
        pip install pandas sqlalchemy psycopg2 openpyxl
        ```

2. **Read the CSV File**:

    - Use the `pandas` library to read the CSV file (`my_data.csv`):

        ```python
        import pandas as pd

        df = pd.read_csv('my_data.csv')
        ```

3. **Connect to PostgreSQL**:

    - Utilize the `sqlalchemy` library to create a connection to the PostgreSQL database.

        ```python
        from sqlalchemy import create_engine

        engine = create_engine('postgresql://username:password@localhost/mydatabase')
        ```

4. **Check and Create Table**:

    - Dynamically check if the table `my_data` exists; if not, create it based on the columns in the DataFrame:

        ```python
        from sqlalchemy import Table, MetaData

        metadata = MetaData(bind=engine)
        if not engine.dialect.has_table(engine, 'my_data'):
            df.head(0).to_sql('my_data', engine, index=False)  # Create table with the same structure
        ```

5. **Insert Data**:

    - Insert the DataFrame into the PostgreSQL database:
        ```python
        try:
            df.to_sql('my_data', engine, if_exists='append', index=False)
        except Exception as e:
            print(f"Error inserting data: {e}")
        ```

6. **Error Handling and Logging**:

    - Implement simple error handling using try-except blocks and log any errors to the CLI:

        ```python
        import logging

        logging.basicConfig(level=logging.INFO)
        logger = logging.getLogger()

        try:
            # All the steps combined, insert logging at each critical operation
            logger.info("Reading data from CSV")
            df = pd.read_csv('my_data.csv')

            logger.info("Connecting to PostgreSQL")
            engine = create_engine('postgresql://username:password@localhost/mydatabase')

            logger.info("Checking if the table exists")
            metadata = MetaData(bind=engine)
            if not engine.dialect.has_table(engine, 'my_data'):
                logger.info("Table does not exist, creating table")
                df.head(0).to_sql('my_data', engine, index=False)

            logger.info("Inserting data into the table")
            df.to_sql('my_data', engine, if_exists='append', index=False)
            logger.info("Data insertion completed successfully")

        except Exception as e:
            logger.error(f"An error occurred: {e}")
        ```

7. **Test the Script**:
    - Run the Python script and verify that the data from the CSV file is correctly inserted into the PostgreSQL database.
    - Check for correct error logging on the CLI.

Following these steps will ensure that the Python script successfully processes the data from the Excel sheet (CSV) and inserts it into the PostgreSQL database while handling errors appropriately.
**\_\_\_\_**
This is estimation: 8

`
