module.exports = {
    moduleFileExtensions: ["ts", "tsx", "js"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testMatch: ["<rootDir>/src/**/tests/**/*.{ts,tsx,js}"],
    testEnvironment: "node",
};
