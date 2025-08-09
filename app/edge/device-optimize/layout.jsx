import '../../../styles/device-page.css';
import NavWithTheme from '../../../components/NavWithTheme';

export default function DeviceOptimizeLayout({ children }) {
  // This layout only adds the device-page class and custom CSS
  // It doesn't duplicate headers or footers
  return (
    <div className="device-page">
      {children}
    </div>
  );
}