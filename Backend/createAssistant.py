from openai import OpenAI
import dotenv
import json
import os

dotenv.load_dotenv()

client = OpenAI(
    api_key = os.getenv("OPENAI_API_KEY")
)

assistant = client.beta.assistants.create(
    name="KU_Assistant",
    instructions="You are an assistant that will recommend to a student as short as possible or with a dot format",
    model="gpt-4-1106-preview",
)

# Upload the file
file = client.files.create(
    file=open(
        "./data.txt",
        "rb",
    ),
    purpose="assistants",
)
# Update Assistant
assistant = client.beta.assistants.update(
    assistant_id=assistant.id,
    tools=[{"type": "code_interpreter"}, {"type": "retrieval"}],
    file_ids=[file.id],
)

print(assistant)
