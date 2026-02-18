export const extractIdFromUrl = (url:string):number  => {
  if(!url) return 0;

  const segments = url.split('/');
  const lastSegment = segments.pop();

  return lastSegment ? Number(lastSegment) : 0;

};