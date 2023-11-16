import {refreshCDN} from '../utils/cdnHelper';
import fmtTime from '../utils/fmtTime';
import Response from '../utils/response';

let lastRefreshCdnTime: number;

export const doRefresh = async () => {
  try {
    if (lastRefreshCdnTime && lastRefreshCdnTime > Date.now() - 5 * 60 * 1000) {
      return Response(500, `please until ${fmtTime(new Date(lastRefreshCdnTime + 5 * 60 * 1000))}`);
    }
    await refreshCDN();
    lastRefreshCdnTime = Date.now();
    return Response(200, 'refresh success');
  } catch (e: any) {
    return Response(500, e.message);
  }
};
