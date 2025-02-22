import discord
from discord import app_commands
import requests
import concurrent.futures

load_dotenv()

# Retrieve the bot token securely from the environment
TOKEN = os.getenv("DISCORD_TOKEN")

intents = discord.Intents.default()
client = discord.Client(intents=intents)
tree = app_commands.CommandTree(client)

def check_url(url):
    """Check if the URL is valid."""
    response = requests.head(url)
    return response.status_code == 200

def find_valid_start_and_frames(base_urls, start_number):
    number = start_number
    valid_start_number = None
    valid_frames = 0
    first_valid_pattern = None

    while True:
        urls_to_check = [url.replace('*', str(number)).replace('#', '01') for url in base_urls]
        with concurrent.futures.ThreadPoolExecutor() as executor:
            results = list(executor.map(check_url, urls_to_check))

        if any(results):
            valid_start_number = number
            break
        number += 1

    number = valid_start_number
    while True:
        frame_number = str(valid_frames + 1).zfill(2)
        urls_to_check = [url.replace('*', str(number + valid_frames)).replace('#', frame_number) for url in base_urls]

        with concurrent.futures.ThreadPoolExecutor() as executor:
            results = list(executor.map(check_url, urls_to_check))

        if not any(results):
            break

        if first_valid_pattern is None:
            for i, is_valid in enumerate(results):
                if is_valid:
                    first_valid_pattern = urls_to_check[i].split('/')[-1]
                    break

        valid_frames += 1

    return valid_start_number, valid_frames, first_valid_pattern

base_urls = [
    "https://gg.asuracomic.net/storage/media/*/conversions/#-optimized.webp",
    "https://gg.asuracomic.net/storage/media/*/conversions/#-kopya-optimized.webp",
    "https://gg.asuracomic.net/storage/media/*/conversions/#-result_optimized.webp",
    "https://gg.asuracomic.net/storage/media/*/conversions/#.jpg"
]

@tree.command(name="find", description="Find the first valid start number and frames")
async def find(interaction: discord.Interaction, startnumber: int):
    await interaction.response.defer()
    valid_start, valid_frames, first_pattern = find_valid_start_and_frames(base_urls, startnumber)
    result_message = f"Start No: {valid_start}\nTotal Valid Frames: {valid_frames}"
    if first_pattern:
        result_message += f"\nFirst Valid Pattern: {first_pattern}"
    await interaction.followup.send(result_message)

@client.event
async def on_ready():
    await tree.sync()
    print(f'Logged in as {client.user}')

client.run(TOKEN)
