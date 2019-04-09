import PropTypes from 'prop-types';
import React from "react";
import 'intl';
import 'intl/locale-data/jsonp/en';

// Custom class for the result component
class FederatedResult extends React.Component {
  renderValue(field, doc) {
    const value = [].concat(doc[field] || null).filter((v) => v !== null);

    return value.join(", ");
  }

  dateFormat(date){
    if (typeof date !== 'undefined') {
      const prettyDate =  new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(Date.parse(date));
      const separator = "  ·  ";
      return separator + prettyDate;
    }
  }

  // Pass both the mutivalue and the single value url as a backup.
  getCanonicalLink(urls, url) {
    if (Array.isArray(urls) && urls.length) {
      // Use the first in the list, which is the canonical (or only).
      return urls[0];
    }

    // Fall back to single value url.
    if (url != null) {
      return url;
    }

    // If no valid urls are passed, return nothing. This will result in an
    // unlinked title, but at least it won't crash.
    return '';
  }

  intersperse(arr, sep) {
    if (arr.length === 0) {
      return [];
    }

    return arr.slice(1).reduce(function(xs, x, i) {
      return xs.concat([sep, x]);
    }, [arr[0]]);
  }

  renderSitenameLinks(sitenames, urls, originalSitename) {
    if (sitenames != null && urls != null) {

      var sites = [];
      for (var i = 0; i < sitenames.length; i++) {
        sites.push(<a class="search-results__site-name" href={urls[i]} key={i}>{sitenames[i]}</a>);
        if (i !== (sitenames.length - 1)) {

        }
      }
      return this.intersperse(sites, " | ");
    }

    if (originalSitename != null) {
      return originalSitename;
    }

    return null;
  }

  render() {
    const { doc, highlight } = this.props;

    return (
      <li onClick={() => this.props.onSelect(doc)}>
        {doc.ss_federated_image &&
        <div className="search-results__container--left">
          <img className="search-results__image" src={doc.ss_federated_image} alt=""/>
        </div>
        }
        <div className="search-results__container--right">
          <span className="search-results__label">{doc.ss_federated_type}</span>
          <h3 className="search-results__heading"><a className="search-results__heading-link" href={this.getCanonicalLink(doc.sm_urls, doc.ss_url)} dangerouslySetInnerHTML={{__html: doc.ss_federated_title}} /></h3>
          <div className="search-results__meta">
            <cite className="search-results__citation">{this.renderSitenameLinks(doc.sm_site_name, doc.sm_urls, doc.ss_site_name)}</cite>
            <span className="search-results__date">{this.dateFormat(doc.ds_federated_date)}</span>
          </div>
          <p className="search-results__teaser" dangerouslySetInnerHTML={{__html: highlight.tm_rendered_item}} />
        </div>
      </li>
    )
  }
}

FederatedResult.propTypes = {
	doc: PropTypes.object,
	fields: PropTypes.array,
	onSelect: PropTypes.func.isRequired,
    hostname: PropTypes.string,
};

export default FederatedResult;
