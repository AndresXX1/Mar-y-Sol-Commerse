"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateConverter = void 0;
const DateConverter = (date) => {
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    return { date: day, month: month, year: year };
};
exports.DateConverter = DateConverter;
//# sourceMappingURL=dateConverter.util.js.map