// test utils
import { mount, shallow } from 'enzyme';
// Components
import {Facet, FacetPanel, FacetBlock,FacetTitle, FacetCount} from '../facet';

describe('Facets components ', () => {
  describe('<FacetBlock />', () => {
    it('should be a div with a data-focus=facet', () => {
      const wrapper = shallow(<FacetBlock />);
      expect(wrapper.find('[data-focus="facet-block"]')).to.have.length(1);
    });
    it('should be a div with a material shadow class', () => {
      const wrapper = shallow(<FacetBlock />);
      expect(wrapper.find('div.mdl-card.mdl-shadow--2dp')).to.have.length(1);
    });
    it('should be an title when a label is provided', () => {
      const wrapper = shallow(<FacetBlock label='don diego'/>);
      expect(wrapper.contains(<h3>{'don diego'}</h3>)).to.be.true;
    });
    it('should be display all the facets provided into values', () => {
      const FACET_VALUES = [
        {code: 'FAIBLE', label: 'faible', count: 22},
        {code: 'MOYEN', label: 'moyen', count: 54},
        {code: 'FORT', label: 'fort', count: 7}
      ];
      const wrapper = mount(<FacetBlock label='don diego' values={FACET_VALUES}/>);
      expect(wrapper.find('[data-focus="facet"]')).to.have.length(FACET_VALUES.length);
    });
    it('should use the FacetComponent provide in the props', () => {
      const facetSpy = sinon.spy();
      const SpyFacetComponent = props => {
        facetSpy(props);
        return <div>Facet</div>
      }
      const FACET_VALUES = [
        {code: 'FAIBLE', label: 'faible', count: 22},
        {code: 'MOYEN', label: 'moyen', count: 54},
        {code: 'FORT', label: 'fort', count: 7}
      ];
      const wrapper = mount(<FacetBlock label='don diego' values={FACET_VALUES} FacetComponent={SpyFacetComponent}/>);
      expect(facetSpy).to.have.callCount(3);
    });

  });
  describe('<Facet />', () => {
    it('should be a li with a data-focus=facet', () => {
      const wrapper = shallow(<Facet />);
      expect(wrapper.find('[data-focus="facet"]')).to.have.length(1);
    });
    it('should be a li with a material class', () => {
      const wrapper = shallow(<Facet />);
      expect(wrapper.find('li.mdl-list__item')).to.have.length(1);
    });
    it('should be a display the provided label', () => {
      const wrapper = shallow(<Facet label='rodrigo'/>);
      expect(wrapper.contains(<FacetTitle>{'rodrigo'}</FacetTitle>)).to.be.true;
    });
    it('should be a display the provided count', () => {
      const wrapper = shallow(<Facet count={3}/>);
      expect(wrapper.contains(<FacetCount>{3}</FacetCount>)).to.be.true;
    });
    it('should call the action on click', () => {
      const selectFacetSpy =  sinon.spy();
      const wrapper = shallow(<Facet code='MONKEY'count={3} label='papa' selectFacet={selectFacetSpy}/>)
      wrapper.find('li').simulate('click');
      expect(selectFacetSpy).to.have.property('callCount', 1);
      expect(selectFacetSpy).to.have.been.calledWith('MONKEY')
    })
  });
})
