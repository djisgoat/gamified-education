import jwt from "jsonwebtoken";

const genToken = async (userId) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }
    const token = await jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "100d",
    });
    return token;
  } catch (error) {
    console.error("Token generation error:", error);
    return null;
  }
};

export default genToken;