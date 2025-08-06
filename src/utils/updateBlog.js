import enrollmentEvents from "../data/json/enrollmentEvents.json";
import news from "../data/json/news.json";
import { updateEnrollmentEvent, updateNews } from "../services/blogService";

// 批次更新 enrollmentEvents
export async function syncEnrollmentEvents() {
  for (const event of enrollmentEvents) {
    try {
      await updateEnrollmentEvent(event.id, event);
      console.log(`enrollmentEvents ${event.id} 已同步`);
    } catch (err) {
      console.error(`同步失敗: ${event.id}`, err);
    }
  }
}

// 你也可以寫 news 的批次更新函式
export async function syncNews() {
  for (const article of news) {
    try {
      await updateNews(article.id, article);
      console.log(`news ${article.id} 已同步`);
    } catch (err) {
      console.error(`同步失敗: ${article.id}`, err);
    }
  }
}
