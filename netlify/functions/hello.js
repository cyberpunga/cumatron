exports.handler = async (req) => {
  try {
    console.log(req);
    return {
      statusCode: 200,
      body: "hello",
    };
  } catch (error) {
    throw error;
  }
};
