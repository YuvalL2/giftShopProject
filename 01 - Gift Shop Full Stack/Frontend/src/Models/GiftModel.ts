class GiftModel {

    public giftId: number;
    public audienceId: number;
    public name: string;
    public description: string;
    public price: number;
    public discount: number;

    public static audienceIdValidation = {
        required: { value: true, message: "חסר קהל יעד" }
    };

    public static nameValidation = {
        required: { value: true, message: "חסר שם מתנה" },
        maxLength: { value: 50, message: "שם מתנה ארוך מידי"}
    };

    public static descriptionValidation = {
        required: { value: true, message: "חסר תיאור מתנה" },
        minLength: { value: 10, message: "תיאור המתנה קצר מידי"},
        maxLength: { value: 1000, message: "תיאור המתנה ארוך מידי"},
    };

    public static priceValidation = {
        required: { value: true, message: "חסר מחיר" },
        min: { value: 0, message: "מחיר לא יכול להיות שלילי"},
        max: { value: 9999, message: "מחיר לא יכול לעלות על 9999"}
    };

    public static discountValidation = {
        required: { value: true, message: "חסרה הנחה" },
        min: { value: 0, message: "הנחה לא יכולה להיות שלילית"},
        max: { value: 100, message: "הנחה יכולה להיות מקסימום 100 אחוז"}
    };

}

export default GiftModel;
