import { buildGraphMatrix } from './buildGraphMatrix';
import { calcFourColorReleation } from './fourColorCaclculate';

export const calcReleations = function(coordinates) {
	return calcFourColorReleation(buildGraphMatrix(coordinates));
};


