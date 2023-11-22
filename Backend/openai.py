from openai import OpenAI
import dotenv
import time
import os
dotenv.load_dotenv()
client = OpenAI(
    api_key = os.getenv("OPENAI_API_KEY"),
)

def get_thread(thread_id):
    return client.beta.threads.retrieve(thread_id=thread_id)

def create_thread_and_run(user_input):
    thread = client.beta.threads.create()
    run = submit_message(os.getenv("ASSISTANT_ID"), thread, user_input)
    return thread, run

def submit_message(assistant_id, thread, user_message):
    client.beta.threads.messages.create(
        thread_id=thread.id, role="user", content=user_message
    )
    return client.beta.threads.runs.create(
        thread_id=thread.id,
        assistant_id=assistant_id,
    )

def get_response(thread):
    return client.beta.threads.messages.list(thread_id=thread.id, order="asc")

def pretty_print(messages):
    print("# Messages")
    for m in messages:
        print(f"{m.role}: {m.content[0].text.value}")
    print()

def wait_on_run(run, thread):
    while run.status == "queued" or run.status == "in_progress":
        run = client.beta.threads.runs.retrieve(
            thread_id=thread.id,
            run_id=run.id,
        )
        time.sleep(0.5)
    return run

# thread1, run1 = create_thread_and_run(
#     "I don't like math. What can I do?"
# )

# print(thread1)
# # Wait for Run 1
# run1 = wait_on_run(run1, thread1)
# pretty_print(get_response(thread1))

# run2 = submit_message(os.getenv("ASSISTANT_ID"), thread1, "Thank you!")
# run2 = wait_on_run(run2, thread1)
# pretty_print(get_response(thread1))

