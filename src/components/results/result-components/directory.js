import React from "react";
import 'intl';
import 'intl/locale-data/jsonp/en';
import FederatedResult from '../result';

// Custom class for the result component
class FederatedDirectoryResult extends FederatedResult {
  render() {
    const { doc, highlight } = this.props;

    return (
      <li className="fs-search-results__item fs-search-results__item--directory" onClick={() => this.props.onSelect(doc)}>
        <h1>FederatedDirectoryResult</h1>
        {doc.ss_federated_image &&
        <div className="fs-search-results__container--left">
          <img className="fs-search-results__image" src={doc.ss_federated_image} alt=""/>
        </div>
        }
        <div className="fs-search-results__container--right">
          <span className="fs-search-results__label">{doc.ss_federated_type}</span>
          <h3 className="fs-search-results__heading"><a href={this.getCanonicalLink(doc)} dangerouslySetInnerHTML={{__html: doc.ss_federated_title}} /></h3>
          <div className="fs-search-results__meta">
            <cite className="fs-search-results__citation">{this.renderSitenameLinks(doc.sm_site_name, doc.sm_urls, doc.ss_site_name)}</cite>
            <span className="fs-search-results__date">{this.dateFormat(doc.ds_federated_date)}</span>
          </div>
          <blockquote cite={this.getCanonicalLink(doc)} className="fs-search-results__teaser" dangerouslySetInnerHTML={{__html: highlight.tm_rendered_item}} />
        </div>
      </li>
    )
  }
}

export default FederatedDirectoryResult;
