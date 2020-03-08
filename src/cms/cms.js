import CMS from 'netlify-cms-app';

//import { CmsModal } from './cmsmodal';
import './style.css';

CMS.registerPreviewStyle('./style.css');
CMS.registerEditorComponent({
  // Internal id of the component
  id: 'youtube',
  // Visible label
  label: 'Youtube',
  // Fields the user need to fill out when adding an instance of the component
  fields: [{ name: 'id', label: 'Youtube Video ID', widget: 'string' }],
  // Pattern to identify a block as being an instance of this component
  pattern: /^youtube (\S+)$/,
  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    return {
      id: match[1],
    };
  },
  // Function to create a text block from an instance of this component
  toBlock: function(obj) {
    return 'youtube ' + obj.id;
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function(obj) {
    return (
      '<img src="http://img.youtube.com/vi/' +
      obj.id +
      '/maxresdefault.jpg" alt="Youtube Video"/>'
    );
  },
});

/*CMS.registerEditorComponent({
  id: 'customImage',
  label: 'CustomImage',
  fields: [
    { label: 'Image', name: 'image', widget: 'image' },
    { label: 'Width', name: 'width', widget: 'number', min: 1, default: 400 },
  ],
  pattern: /^{ {< customImage "(\S+)" (\S+) >} }$/,
  fromBlock: function(match) {
    console.log(match);
    return {
      image: match[1],
      width: match[2],
    };
  },
  toBlock: function(obj) {
    return (
      '<figure><img src=' +
      obj.image +
      ' width=' +
      obj.width +
      ' style="height:auto;"/></figure>'
    );
  },
  toPreview: function(obj) {
    return (
      '<figure><img src=' +
      obj.image +
      ' width=' +
      obj.width +
      ' style="height:auto;"/></figure>'
    );
  },
});*/
