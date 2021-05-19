import StoryCard from "./StoryCard";

function Stories() {
    const stories = [
        {
            name: "Elon Musk",
            src: "/MuskSrc.jpg",
            profile: "/MuskPic.jpg"
        },
        {
            name: "Jeff Bezoz",
            src: "/JeffSrc.jpg",
            profile: "/JeffPic.jpg",
        },
        {
            name: "Mark Zuckerberg",
            src: "/MarkSrc.jpg",
            profile: "/MarkPic.jpg",
        },
        {
            name: "Bill Gates",
            src: "/BillSrc.jpg",
            profile: "/BillPic.jpg",
        },
        {
            name: "Steve Jobs",
            src: "/SteveSrc.jpg",
            profile: "/StevePic.jpg",
        }
    ];

    return (
        <div className="flex justify-center space-x-3 mx-auto">
            {stories.map((story) => (
                <StoryCard
                    key={story.src}
                    name={story.name}
                    src={story.src}
                    profile={story.profile}
                />
            ))}
        </div>
    )
}

export default Stories
