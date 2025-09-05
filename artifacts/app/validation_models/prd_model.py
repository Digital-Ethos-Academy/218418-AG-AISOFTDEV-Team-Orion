from pydantic import BaseModel, Field
from typing import List, Dict, Any

class UserStory(BaseModel):
    user_story: str
    acceptance_criteria: List[str]

class Feature(BaseModel):
    title: str
    user_stories: List[UserStory]

class PRD(BaseModel):
    introduction: str
    user_personas: List[str]
    features: List[Feature]

# Example instantiation
prd_example = PRD(
    introduction="The product is a comprehensive movie and TV show management platform designed to enhance the viewing experience for users who are passionate about films and television...",
    user_personas=[
        "Avid Movie and TV Enthusiast: This user is deeply invested...",
        "Casual Viewer: This user enjoys watching movies and TV shows...",
        "Content Critic or Reviewer: This user often critiques or reviews content..."
    ],
    features=[
        Feature(
            title="Watchlist Management",
            user_stories=[
                UserStory(
                    user_story="As an Avid Movie and TV Enthusiast, I want to manage my watchlist...",
                    acceptance_criteria=[
                        "Add movies or shows to a 'planned to watch' list.",
                        "Move items to a 'watched' list once viewed."
                    ]
                )
            ]
        ),
        Feature(
            title="Rating and Review System",
            user_stories=[
                UserStory(
                    user_story="As an Avid Movie and TV Enthusiast, I want to rate and review movies and shows...",
                    acceptance_criteria=[
                        "Save ratings and display them in the user's profile.",
                        "Write and save reviews, visible in the user's profile."
                    ]
                )
            ]
        ),
        # Add remaining features similarly...
    ]
)