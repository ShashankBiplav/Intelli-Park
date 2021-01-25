export const isPhoneUnique = async (Model, phone) =>{
  const user = await Model.findOne({phone:phone});
  return !user;
};
