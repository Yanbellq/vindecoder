export const getFirstParagraphText = (htmlString: string): string => {
  if (!htmlString) return '';

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const firstP = doc.querySelector('p');

    return firstP ? firstP.textContent || '' : doc.body.textContent || '';
  } catch (e) {
    return htmlString.replace(/<[^>]*>/g, '');
  }
};
