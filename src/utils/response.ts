export default (status: number, msg?: string, data: any = null) => {
  if (!msg) {
    switch (status) {
      case 200:
        msg = 'Success';
        break;
      case 400:
        msg = 'Params not find';
    }
  }

  return {
    status,
    msg,
    data,
  };
};
