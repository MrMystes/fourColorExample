import { intersectsPolygonAndPolygon } from './polygonIntersects';
let cache = null;
function transformPointArrayToPointXY(polygonLinearRings) {
	return polygonLinearRings.map(point => {
		return {
			x: point[0],
			y: point[1]
		};
	});
}
export const buildGraphMatrix = function (coordinates) {
	console.time('buildGraphMatrix');
	if (cache) {
		return cache;
	}
	let len = coordinates.length;
	const matrix = coordinates.map(() => []);
	for (let i = 0; i < len - 1; i++) {
		console.log(i);
		for (let j = i + 1; j < len; j++) {
			const polygonLinearRing1 = transformPointArrayToPointXY(coordinates[i][0]);
			const polygonLinearRing2 = transformPointArrayToPointXY(coordinates[j][0]);
			matrix[i][j] = intersectsPolygonAndPolygon(polygonLinearRing1, polygonLinearRing2) ? 1 : 0;
		}
	}
	for (let i = 0; i < len; i++) {
		for (let j = 0; j < len; j++) {
			if (i === j) {
				matrix[i][j] = 0;
			}
			if (i > j) {
				matrix[i][j] = matrix[j][i];
			}
		}
	}
	console.timeEnd('buildGraphMatrix');
	console.log(matrix);
	cache = matrix;
	return matrix;
};

