class AppConfig {
    public audienceUrl = "http://localhost:4000/api/audience/";
    public giftsByAudienceUrl = "http://localhost:4000/api/gifts-by-audience/";
    public giftsUrl = "http://localhost:4000/api/gifts/";
}

const appConfig = new AppConfig();

export default appConfig;
