from langchain.chat_models import init_chat_model
from langchain_community.utilities import SQLDatabase
from langchain_community.agent_toolkits import SQLDatabaseToolkit
from langchain.agents import create_agent
from dotenv import load_dotenv

load_dotenv()

system_prompt = """
You are an agent designed to interact with a SQL database.

Generate SQL queries to answer the user question.
Limit results to 5 rows unless asked otherwise.
"""

model = init_chat_model("gpt-4o-mini")


def query_agent(db_name, question):

    db = SQLDatabase.from_uri(db_name)

    toolkit = SQLDatabaseToolkit(db=db, llm=model)

    tools = toolkit.get_tools()

    agent = create_agent(
        model,
        tools,
        system_prompt=system_prompt
    )

    response = ""

    for step in agent.stream(
        {"messages": [{"role": "user", "content": question}]},
        stream_mode="values",
    ):
        response = step["messages"][-1].content

    return response