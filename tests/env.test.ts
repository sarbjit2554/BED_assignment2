test("Environment variables should be loaded", () => {
    expect(process.env.FIREBASE_PRIVATE_KEY).toBeDefined();
    expect(process.env.FIREBASE_CLIENT_EMAIL).toBeDefined();
  });
  