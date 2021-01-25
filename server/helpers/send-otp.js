import axios from 'axios';

export const sendOtp = async (generatedOTP, phone) => {
  let url = `https://api.msg91.com/api/v5/otp?authkey=${process.env.AUTH_KEY}&template_id=${process.env.TEMPLATE_ID}&mobile=${Number.parseInt(91 + phone)}&otp=${generatedOTP}`;
  try {
    return await axios.get(url);
  } catch (err) {
    console.log(err);
  }
};

