import MinimumRequirement from '../models/minimum-requirements.js';

export const checkTimeValidity = async () => {
  const minimumRequirement = await MinimumRequirement.findOne({},{},{sort: {createdAt: -1}});
  const minReqStartingHour = minimumRequirement.collectionStartHour;
  const minReqEndingHour = minimumRequirement.collectionEndHour;
  const currentTime = new Date();
  const currentTimeHour = currentTime.getHours();
  return currentTimeHour >= minReqStartingHour && currentTimeHour <= minReqEndingHour;
};
