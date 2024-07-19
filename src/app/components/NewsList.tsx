import NewsItemLeft from "./NewsItemLeft"
import NewsItemRight from "./NewsItemRight"

interface NewsItem {
    id: number,
    title: string, 
    body: string, 
    button_text: string, 
    button_url: string, 
    image_url: string, 
    image_position: string
}

interface News {
    news: NewsItem[]
}

export default function NewsList({news}: News) {
    return (
        <div>
            {news.map((newsItem) => (
                <div key={newsItem.id}>
                    {newsItem.image_position === "right" ? 
                    (
                        <NewsItemRight title={newsItem.title} 
                        img={newsItem.image_url}
                        info={newsItem.body}
                        buttonInfo={newsItem.button_text}
                        link={newsItem.button_url} />
                    ) : 
                    (
                        <NewsItemLeft title={newsItem.title} 
                        img={newsItem.image_url}
                        info={newsItem.body}
                        buttonInfo={newsItem.button_text}
                        link={newsItem.button_url} />
                    )}
                </div>
            ))}
        </div>
    )
}