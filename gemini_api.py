# Modules
import json
import os
from serpapi import GoogleSearch
from google import genai
from google.genai import types


def search_scholar_links(q: str, engine="google_scholar", lang="en"):
    search_params = {
        "engine": engine,
        "q": q,
        "hl": lang,
        "api_key": os.environ["SERP_GOOGLE_SCHOLAR_API_KEY"],
    }

    search: GoogleSearch = GoogleSearch(search_params)
    organic_results = search.get_dict()["organic_results"]
    parsed = json.loads(json.dumps(organic_results, indent=4))

    all_link_results = {result["title"]: result["link"] for result in parsed}
    return all_link_results


def get_gemini_response(
    content: str,
    instructions: str = None,
    thinking_level: str = "low",
    model="gemini-3-flash-preview",
):
    client = genai.Client()
    return client.models.generate_content(
        model=model,
        contents=content,
        config=types.GenerateContentConfig(
            thinking_config=types.ThinkingConfig(thinking_level=thinking_level),
            system_instruction=instructions,
        ),
    ).text


def ask_and_get_info(topic: str):
    result = get_gemini_response(
        content=f"Help me get information about '{topic}', from the given info here: {search_scholar_links(q=topic)}",
        instructions="You are a friendly helper who finds infomation for me according to the links given.",
    )
    return result
