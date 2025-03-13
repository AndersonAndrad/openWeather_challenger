module.exports = {
    transform: {
        "^.+\\.tsx?$": "babel-jest",
    },
    collectCoverage: true,
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: -10
        }
    },
    testPathIgnorePatterns: ["/node_modules/", "/dist/"]
};
