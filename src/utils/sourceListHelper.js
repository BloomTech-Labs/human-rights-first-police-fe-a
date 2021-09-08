import { nanoid } from 'nanoid';

/**
 * This function takes a list of urls and returns a list of links showing just the site name for the link text
 *
 * (This technically should be a component, but I'm just documenting it as it was written.) *
 *
 * @param {string[]} sources - a list of urls
 * @returns {JSX.Element} a list of links
 */
const sourceListHelper = sources => {
  // This still has a bug if the url has a . anywhere besides www. and .com
  function getDomain(url) {
    url = url.replace(/(https?:\/\/)?(www.)?/i, '');
    url = url.split('.');
    url = url.slice(url.length - 2).join('.');
    if (url.indexOf('/') !== -1) {
      return url.split('/')[0];
    }
    return url;
  }

  return (
    <div>
      {!sources || sources === [] || !Array.isArray(sources) ? (
        <p>No sources listed</p>
      ) : (
        sources.map(source => {
          return (
            <div key={nanoid()}>
              <a href={source} target="_blank" rel="noopener noreferrer">
                {getDomain(source)}
              </a>
            </div>
          );
        })
      )}
    </div>
  );
};

export default sourceListHelper;
