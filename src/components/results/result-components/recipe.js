import React from "react";
import 'intl';
import 'intl/locale-data/jsonp/en';
import FederatedResult from '../result';

// Custom class for the result component
class FederatedRecipeResult extends FederatedResult {
  render() {
    const { doc, highlight } = this.props;

    return (
      <li className="fs-search-results__item fs-search-results__item--recipe" onClick={() => this.props.onSelect(doc)}>
        {doc.sm_department && doc.sm_department.map(dep => (
          <span className="fs-search-results__department">{dep}</span>
        ))}
        {!doc.sm_department && 
          <span className="fs-search-results__department">BMC</span>
        }
        
        {doc.ss_federated_image &&
        <div className="fs-search-results__container--left">
          <img className="fs-search-results__image" src={doc.ss_federated_image} alt=""/>
        </div>
        }

        <div className="fs-search-results__container--right">
          <h3 className="fs-search-results__title"><a href={this.getCanonicalLink(doc)} dangerouslySetInnerHTML={{__html: doc.ss_federated_title}} /></h3>
          <blockquote cite={this.getCanonicalLink(doc)} className="fs-search-results__summary" dangerouslySetInnerHTML={{__html: doc.ss_summary}} />
          <div className="fs-search-results__meta">
            <cite className="fs-search-results__citation">{this.renderSitenameLinks(doc.sm_site_name, doc.sm_urls, doc.ss_site_name)}</cite>
            <span className="fs-search-results__date">{this.dateFormat(doc.ds_federated_date)}</span>
            <span className="fs-search-results__type">{doc.sm_federated_type}</span>
          </div>
          {/* <blockquote cite={this.getCanonicalLink(doc)} className="fs-search-results__teaser" dangerouslySetInnerHTML={{__html: highlight.tm_rendered_item}} /> */}
        </div>
      </li>
    )
  }
}

export default FederatedRecipeResult;
