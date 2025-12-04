import React, { useState, useEffect, useRef, useMemo } from 'react';
import QRCode from 'qrcode';
import { Copy, Check, Download, ExternalLink, RefreshCw, MessageSquare, ChevronDown, Search, Phone } from 'lucide-react';

interface Country {
  name: string;
  code: string;
  flag: string;
  iso: string;
}

const COUNTRIES: Country[] = [
  { name: "Brazil", code: "55", flag: "🇧🇷", iso: "BR" },
  { name: "United States", code: "1", flag: "🇺🇸", iso: "US" },
  { name: "Afghanistan", code: "93", flag: "🇦🇫", iso: "AF" },
  { name: "Albania", code: "355", flag: "🇦🇱", iso: "AL" },
  { name: "Algeria", code: "213", flag: "🇩🇿", iso: "DZ" },
  { name: "Andorra", code: "376", flag: "🇦🇩", iso: "AD" },
  { name: "Angola", code: "244", flag: "🇦🇴", iso: "AO" },
  { name: "Argentina", code: "54", flag: "🇦🇷", iso: "AR" },
  { name: "Armenia", code: "374", flag: "🇦🇲", iso: "AM" },
  { name: "Australia", code: "61", flag: "🇦🇺", iso: "AU" },
  { name: "Austria", code: "43", flag: "🇦🇹", iso: "AT" },
  { name: "Azerbaijan", code: "994", flag: "🇦🇿", iso: "AZ" },
  { name: "Bahrain", code: "973", flag: "🇧🇭", iso: "BH" },
  { name: "Bangladesh", code: "880", flag: "🇧🇩", iso: "BD" },
  { name: "Belarus", code: "375", flag: "🇧🇾", iso: "BY" },
  { name: "Belgium", code: "32", flag: "🇧🇪", iso: "BE" },
  { name: "Belize", code: "501", flag: "🇧🇿", iso: "BZ" },
  { name: "Benin", code: "229", flag: "🇧🇯", iso: "BJ" },
  { name: "Bhutan", code: "975", flag: "🇧🇹", iso: "BT" },
  { name: "Bolivia", code: "591", flag: "🇧🇴", iso: "BO" },
  { name: "Bosnia and Herzegovina", code: "387", flag: "🇧🇦", iso: "BA" },
  { name: "Botswana", code: "267", flag: "🇧🇼", iso: "BW" },
  { name: "Brunei", code: "673", flag: "🇧🇳", iso: "BN" },
  { name: "Bulgaria", code: "359", flag: "🇧🇬", iso: "BG" },
  { name: "Burkina Faso", code: "226", flag: "🇧🇫", iso: "BF" },
  { name: "Burundi", code: "257", flag: "🇧🇮", iso: "BI" },
  { name: "Cambodia", code: "855", flag: "🇰🇭", iso: "KH" },
  { name: "Cameroon", code: "237", flag: "🇨🇲", iso: "CM" },
  { name: "Canada", code: "1", flag: "🇨🇦", iso: "CA" },
  { name: "Cape Verde", code: "238", flag: "🇨🇻", iso: "CV" },
  { name: "Central African Republic", code: "236", flag: "🇨🇫", iso: "CF" },
  { name: "Chad", code: "235", flag: "🇹🇩", iso: "TD" },
  { name: "Chile", code: "56", flag: "🇨🇱", iso: "CL" },
  { name: "China", code: "86", flag: "🇨🇳", iso: "CN" },
  { name: "Colombia", code: "57", flag: "🇨🇴", iso: "CO" },
  { name: "Comoros", code: "269", flag: "🇰🇲", iso: "KM" },
  { name: "Costa Rica", code: "506", flag: "🇨🇷", iso: "CR" },
  { name: "Croatia", code: "385", flag: "🇭🇷", iso: "HR" },
  { name: "Cuba", code: "53", flag: "🇨🇺", iso: "CU" },
  { name: "Cyprus", code: "357", flag: "🇨🇾", iso: "CY" },
  { name: "Czech Republic", code: "420", flag: "🇨🇿", iso: "CZ" },
  { name: "Denmark", code: "45", flag: "🇩🇰", iso: "DK" },
  { name: "Djibouti", code: "253", flag: "🇩🇯", iso: "DJ" },
  { name: "Ecuador", code: "593", flag: "🇪🇨", iso: "EC" },
  { name: "Egypt", code: "20", flag: "🇪🇬", iso: "EG" },
  { name: "El Salvador", code: "503", flag: "🇸🇻", iso: "SV" },
  { name: "Equatorial Guinea", code: "240", flag: "🇬🇶", iso: "GQ" },
  { name: "Eritrea", code: "291", flag: "🇪🇷", iso: "ER" },
  { name: "Estonia", code: "372", flag: "🇪🇪", iso: "EE" },
  { name: "Ethiopia", code: "251", flag: "🇪🇹", iso: "ET" },
  { name: "Finland", code: "358", flag: "🇫🇮", iso: "FI" },
  { name: "France", code: "33", flag: "🇫🇷", iso: "FR" },
  { name: "Gabon", code: "241", flag: "🇬🇦", iso: "GA" },
  { name: "Gambia", code: "220", flag: "🇬🇲", iso: "GM" },
  { name: "Georgia", code: "995", flag: "🇬🇪", iso: "GE" },
  { name: "Germany", code: "49", flag: "🇩🇪", iso: "DE" },
  { name: "Ghana", code: "233", flag: "🇬🇭", iso: "GH" },
  { name: "Greece", code: "30", flag: "🇬🇷", iso: "GR" },
  { name: "Guatemala", code: "502", flag: "🇬🇹", iso: "GT" },
  { name: "Guinea", code: "224", flag: "🇬🇳", iso: "GN" },
  { name: "Guinea-Bissau", code: "245", flag: "🇬🇼", iso: "GW" },
  { name: "Guyana", code: "592", flag: "🇬🇾", iso: "GY" },
  { name: "Haiti", code: "509", flag: "🇭🇹", iso: "HT" },
  { name: "Honduras", code: "504", flag: "🇭🇳", iso: "HN" },
  { name: "Hong Kong", code: "852", flag: "🇭🇰", iso: "HK" },
  { name: "Hungary", code: "36", flag: "🇭🇺", iso: "HU" },
  { name: "Iceland", code: "354", flag: "🇮🇸", iso: "IS" },
  { name: "India", code: "91", flag: "🇮🇳", iso: "IN" },
  { name: "Indonesia", code: "62", flag: "🇮🇩", iso: "ID" },
  { name: "Iran", code: "98", flag: "🇮🇷", iso: "IR" },
  { name: "Iraq", code: "964", flag: "🇮🇶", iso: "IQ" },
  { name: "Ireland", code: "353", flag: "🇮🇪", iso: "IE" },
  { name: "Israel", code: "972", flag: "🇮🇱", iso: "IL" },
  { name: "Italy", code: "39", flag: "🇮🇹", iso: "IT" },
  { name: "Jamaica", code: "1-876", flag: "🇯🇲", iso: "JM" },
  { name: "Japan", code: "81", flag: "🇯🇵", iso: "JP" },
  { name: "Jordan", code: "962", flag: "🇯🇴", iso: "JO" },
  { name: "Kazakhstan", code: "7", flag: "🇰🇿", iso: "KZ" },
  { name: "Kenya", code: "254", flag: "🇰🇪", iso: "KE" },
  { name: "Kuwait", code: "965", flag: "🇰🇼", iso: "KW" },
  { name: "Kyrgyzstan", code: "996", flag: "🇰🇬", iso: "KG" },
  { name: "Laos", code: "856", flag: "🇱🇦", iso: "LA" },
  { name: "Latvia", code: "371", flag: "🇱🇻", iso: "LV" },
  { name: "Lebanon", code: "961", flag: "🇱🇧", iso: "LB" },
  { name: "Lesotho", code: "266", flag: "🇱🇸", iso: "LS" },
  { name: "Liberia", code: "231", flag: "🇱🇷", iso: "LR" },
  { name: "Libya", code: "218", flag: "🇱🇾", iso: "LY" },
  { name: "Liechtenstein", code: "423", flag: "🇱🇮", iso: "LI" },
  { name: "Lithuania", code: "370", flag: "🇱🇹", iso: "LT" },
  { name: "Luxembourg", code: "352", flag: "🇱🇺", iso: "LU" },
  { name: "Macau", code: "853", flag: "🇲🇴", iso: "MO" },
  { name: "Macedonia", code: "389", flag: "🇲🇰", iso: "MK" },
  { name: "Madagascar", code: "261", flag: "🇲🇬", iso: "MG" },
  { name: "Malawi", code: "265", flag: "🇲🇼", iso: "MW" },
  { name: "Malaysia", code: "60", flag: "🇲🇾", iso: "MY" },
  { name: "Maldives", code: "960", flag: "🇲🇻", iso: "MV" },
  { name: "Mali", code: "223", flag: "🇲🇱", iso: "ML" },
  { name: "Malta", code: "356", flag: "🇲🇹", iso: "MT" },
  { name: "Mauritania", code: "222", flag: "🇲🇷", iso: "MR" },
  { name: "Mauritius", code: "230", flag: "🇲🇺", iso: "MU" },
  { name: "Mexico", code: "52", flag: "🇲🇽", iso: "MX" },
  { name: "Moldova", code: "373", flag: "🇲🇩", iso: "MD" },
  { name: "Monaco", code: "377", flag: "🇲🇨", iso: "MC" },
  { name: "Mongolia", code: "976", flag: "🇲🇳", iso: "MN" },
  { name: "Montenegro", code: "382", flag: "🇲🇪", iso: "ME" },
  { name: "Morocco", code: "212", flag: "🇲🇦", iso: "MA" },
  { name: "Mozambique", code: "258", flag: "🇲🇿", iso: "MZ" },
  { name: "Myanmar", code: "95", flag: "🇲🇲", iso: "MM" },
  { name: "Namibia", code: "264", flag: "🇳🇦", iso: "NA" },
  { name: "Nepal", code: "977", flag: "🇳🇵", iso: "NP" },
  { name: "Netherlands", code: "31", flag: "🇳🇱", iso: "NL" },
  { name: "New Zealand", code: "64", flag: "🇳🇿", iso: "NZ" },
  { name: "Nicaragua", code: "505", flag: "🇳🇮", iso: "NI" },
  { name: "Niger", code: "227", flag: "🇳🇪", iso: "NE" },
  { name: "Nigeria", code: "234", flag: "🇳🇬", iso: "NG" },
  { name: "North Korea", code: "850", flag: "🇰🇵", iso: "KP" },
  { name: "Norway", code: "47", flag: "🇳🇴", iso: "NO" },
  { name: "Oman", code: "968", flag: "🇴🇲", iso: "OM" },
  { name: "Pakistan", code: "92", flag: "🇵🇰", iso: "PK" },
  { name: "Palestine", code: "970", flag: "🇵🇸", iso: "PS" },
  { name: "Panama", code: "507", flag: "🇵🇦", iso: "PA" },
  { name: "Papua New Guinea", code: "675", flag: "🇵🇬", iso: "PG" },
  { name: "Paraguay", code: "595", flag: "🇵🇾", iso: "PY" },
  { name: "Peru", code: "51", flag: "🇵🇪", iso: "PE" },
  { name: "Philippines", code: "63", flag: "🇵🇭", iso: "PH" },
  { name: "Poland", code: "48", flag: "🇵🇱", iso: "PL" },
  { name: "Portugal", code: "351", flag: "🇵🇹", iso: "PT" },
  { name: "Qatar", code: "974", flag: "🇶🇦", iso: "QA" },
  { name: "Romania", code: "40", flag: "🇷🇴", iso: "RO" },
  { name: "Russia", code: "7", flag: "🇷🇺", iso: "RU" },
  { name: "Rwanda", code: "250", flag: "🇷🇼", iso: "RW" },
  { name: "Saudi Arabia", code: "966", flag: "🇸🇦", iso: "SA" },
  { name: "Senegal", code: "221", flag: "🇸🇳", iso: "SN" },
  { name: "Serbia", code: "381", flag: "🇷🇸", iso: "RS" },
  { name: "Seychelles", code: "248", flag: "🇸🇨", iso: "SC" },
  { name: "Sierra Leone", code: "232", flag: "🇸🇱", iso: "SL" },
  { name: "Singapore", code: "65", flag: "🇸🇬", iso: "SG" },
  { name: "Slovakia", code: "421", flag: "🇸🇰", iso: "SK" },
  { name: "Slovenia", code: "386", flag: "🇸🇮", iso: "SI" },
  { name: "Somalia", code: "252", flag: "🇸🇴", iso: "SO" },
  { name: "South Africa", code: "27", flag: "🇿🇦", iso: "ZA" },
  { name: "South Korea", code: "82", flag: "🇰🇷", iso: "KR" },
  { name: "Spain", code: "34", flag: "🇪🇸", iso: "ES" },
  { name: "Sri Lanka", code: "94", flag: "🇱🇰", iso: "LK" },
  { name: "Sudan", code: "249", flag: "🇸🇩", iso: "SD" },
  { name: "Suriname", code: "597", flag: "🇸🇷", iso: "SR" },
  { name: "Swaziland", code: "268", flag: "🇸🇿", iso: "SZ" },
  { name: "Sweden", code: "46", flag: "🇸🇪", iso: "SE" },
  { name: "Switzerland", code: "41", flag: "🇨🇭", iso: "CH" },
  { name: "Syria", code: "963", flag: "🇸🇾", iso: "SY" },
  { name: "Taiwan", code: "886", flag: "🇹🇼", iso: "TW" },
  { name: "Tajikistan", code: "992", flag: "🇹🇯", iso: "TJ" },
  { name: "Tanzania", code: "255", flag: "🇹🇿", iso: "TZ" },
  { name: "Thailand", code: "66", flag: "🇹🇭", iso: "TH" },
  { name: "Timor-Leste", code: "670", flag: "🇹🇱", iso: "TL" },
  { name: "Togo", code: "228", flag: "🇹🇬", iso: "TG" },
  { name: "Tunisia", code: "216", flag: "🇹🇳", iso: "TN" },
  { name: "Turkey", code: "90", flag: "🇹🇷", iso: "TR" },
  { name: "Turkmenistan", code: "993", flag: "🇹🇲", iso: "TM" },
  { name: "Uganda", code: "256", flag: "🇺🇬", iso: "UG" },
  { name: "Ukraine", code: "380", flag: "🇺🇦", iso: "UA" },
  { name: "United Arab Emirates", code: "971", flag: "🇦🇪", iso: "AE" },
  { name: "United Kingdom", code: "44", flag: "🇬🇧", iso: "GB" },
  { name: "Uruguay", code: "598", flag: "🇺🇾", iso: "UY" },
  { name: "Uzbekistan", code: "998", flag: "🇺🇿", iso: "UZ" },
  { name: "Venezuela", code: "58", flag: "🇻🇪", iso: "VE" },
  { name: "Vietnam", code: "84", flag: "🇻🇳", iso: "VN" },
  { name: "Yemen", code: "967", flag: "🇾🇪", iso: "YE" },
  { name: "Zambia", code: "260", flag: "🇿🇲", iso: "ZM" },
  { name: "Zimbabwe", code: "263", flag: "🇿🇼", iso: "ZW" }
];

export const Generator: React.FC = () => {
  const [selectedIso, setSelectedIso] = useState<string>('BR');
  const [phone, setPhone] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [generatedLink, setGeneratedLink] = useState<string>('');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [loadingQr, setLoadingQr] = useState<boolean>(false);
  
  // Dropdown State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCountry = COUNTRIES.find(c => c.iso === selectedIso) || COUNTRIES[0];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formatPhoneDisplay = (rawDigits: string, countryIso: string) => {
    // Brazil mask logic
    if (countryIso === 'BR') {
      const limited = rawDigits.substring(0, 11);
      if (limited.length <= 2) return limited;
      if (limited.length <= 7) return `(${limited.substring(0, 2)}) ${limited.substring(2)}`;
      return `(${limited.substring(0, 2)}) ${limited.substring(2, 7)}-${limited.substring(7)}`;
    }
    
    // Generic formatting for others
    return rawDigits.substring(0, 15);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    // Only allow typing numbers and basic formatting chars
    if (!/^[\d\s()-]*$/.test(raw)) return;
    
    // Strip to get numbers for re-masking
    const nums = raw.replace(/\D/g, '');
    
    setPhone(formatPhoneDisplay(nums, selectedIso));
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedIso(country.iso);
    setIsDropdownOpen(false);
    setSearchTerm(''); // Reset search
    
    // Re-format current number with new country rules
    const nums = phone.replace(/\D/g, '');
    setPhone(formatPhoneDisplay(nums, country.iso));
  };

  // Filter countries for dropdown
  const filteredCountries = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return COUNTRIES.filter(c => 
      c.name.toLowerCase().includes(term) || 
      c.code.includes(term)
    );
  }, [searchTerm]);

  // Effect to generate link and QR code whenever inputs change
  useEffect(() => {
    const rawDigits = phone.replace(/\D/g, '');
    
    // Min length check
    if (rawDigits.length < 4) {
      setGeneratedLink('');
      setQrCodeDataUrl('');
      return;
    }

    const fullNumber = `${selectedCountry.code}${rawDigits}`;
    const encodedMessage = encodeURIComponent(message);
    const link = `https://wa.me/${fullNumber}${message ? `?text=${encodedMessage}` : ''}`;
    
    setGeneratedLink(link);
    generateQRCode(link);
    setCopied(false);
  }, [phone, message, selectedIso, selectedCountry.code]);

  const generateQRCode = async (text: string) => {
    try {
      setLoadingQr(true);
      const url = await QRCode.toDataURL(text, {
        width: 720,
        margin: 1,
        color: {
          dark: '#004FBD',
          light: '#FFFFFF',
        },
      });
      setQrCodeDataUrl(url);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingQr(false);
    }
  };

  const handleCopy = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async (format: 'png' | 'svg') => {
    if (!generatedLink) return;

    const rawDigits = phone.replace(/\D/g, '');
    const fileName = `whatsapp-${selectedCountry.code}${rawDigits}.${format}`;

    if (format === 'png') {
      const link = document.createElement('a');
      link.download = fileName;
      link.href = qrCodeDataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      try {
        const svgString = await QRCode.toString(generatedLink, {
          type: 'svg',
          width: 720,
          margin: 1,
          color: {
            dark: '#004FBD',
            light: '#FFFFFF',
          },
        });
        
        const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        console.error('Error generating SVG', err);
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-zap-blue-dark to-zap-blue-light p-6 text-white text-center">
        <h2 className="text-xl font-bold">Gerador de Link e QR Code</h2>
        <p className="text-blue-100 text-sm">Preencha os dados abaixo</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">
              Número do WhatsApp <span className="text-red-500">*</span>
            </label>
            
            {/* Country and Phone Input Group */}
            <div className="flex bg-white border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-zap-green focus-within:border-transparent transition-all overflow-visible shadow-sm z-20 relative">
              
              {/* Custom Dropdown Trigger */}
              <div ref={dropdownRef} className="relative border-r border-gray-100 bg-gray-50/50 rounded-l-xl">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="h-full flex items-center gap-2 pl-3 pr-2 py-3 outline-none text-gray-700 font-medium hover:bg-gray-100/50 transition-colors whitespace-nowrap min-w-[100px]"
                >
                  <span className="text-lg">{selectedCountry.flag}</span>
                  <span className="text-sm font-bold">+{selectedCountry.code}</span>
                  <ChevronDown size={14} className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-[calc(100%+4px)] left-0 w-72 bg-white shadow-xl rounded-xl border border-gray-100 flex flex-col max-h-80 overflow-hidden animate-in fade-in zoom-in-95 duration-100 z-50">
                    <div className="p-2 sticky top-0 bg-white border-b border-gray-50 z-10">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                        <input
                          autoFocus
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Pesquisar país ou código..."
                          className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-zap-green transition-colors"
                        />
                      </div>
                    </div>
                    <div className="overflow-y-auto flex-1 p-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-gray-50 [&::-webkit-scrollbar-thumb]:bg-zap-green/50 hover:[&::-webkit-scrollbar-thumb]:bg-zap-green [&::-webkit-scrollbar-thumb]:rounded-full">
                      {filteredCountries.length > 0 ? (
                        filteredCountries.map((country) => (
                          <button
                            key={country.iso}
                            onClick={() => handleCountrySelect(country)}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors text-sm ${
                              selectedIso === country.iso 
                                ? 'bg-zap-green/10 text-zap-green font-medium' 
                                : 'hover:bg-gray-50 text-gray-700'
                            }`}
                          >
                            <span className="text-lg">{country.flag}</span>
                            <span className="flex-1 truncate">{country.name}</span>
                            <span className="text-gray-400 font-mono">+{country.code}</span>
                          </button>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-400 text-sm">
                          Nenhum país encontrado
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder={selectedIso === 'BR' ? '(11) 99999-9999' : 'Digite o número...'}
                className="flex-1 px-4 py-3 bg-white outline-none font-mono text-lg text-gray-800 placeholder-gray-400 rounded-r-xl"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1 ml-1">
              {selectedIso === 'BR' ? 'Digite apenas números com DDD' : 'Digite o número do telefone'}
            </p>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">
              Mensagem Inicial (Opcional)
            </label>
            <div className="relative bg-white border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-zap-green focus-within:border-transparent transition-all shadow-sm z-10">
              <div className="absolute top-3 left-3 pointer-events-none text-gray-400">
                <MessageSquare size={18} />
              </div>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Olá, gostaria de mais informações..."
                rows={3}
                className="w-full pl-10 pr-4 py-3 bg-transparent outline-none text-gray-800 resize-none rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Result Section */}
        {generatedLink && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pt-4 border-t border-gray-100 z-0">
            
            <div className="bg-zap-green/5 rounded-xl p-4 border border-zap-green/20 mb-6">
              <div className="flex items-center justify-between gap-3 mb-2">
                 <span className="text-xs font-bold text-zap-green uppercase tracking-wide">Seu Link Gerado</span>
                 <a 
                   href={generatedLink} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-xs font-semibold text-zap-blue-light flex items-center gap-1 hover:underline"
                 >
                   Testar Link <ExternalLink size={12} />
                 </a>
              </div>
              <div className="flex gap-2">
                <div className="flex-grow bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-600 text-sm truncate font-mono select-all shadow-sm">
                  {generatedLink}
                </div>
                <button
                  onClick={handleCopy}
                  className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg transition-all shadow-sm ${
                    copied 
                      ? 'bg-zap-green text-white' 
                      : 'bg-zap-blue-light text-white hover:bg-zap-blue-dark'
                  }`}
                  title="Copiar Link"
                >
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                </button>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative group">
                <div className={`w-40 h-40 bg-white p-2 rounded-xl border border-gray-200 shadow-sm flex items-center justify-center ${loadingQr ? 'opacity-50' : ''}`}>
                   {qrCodeDataUrl ? (
                     <img 
                      src={qrCodeDataUrl} 
                      alt="QR Code WhatsApp" 
                      className="w-full h-full object-contain"
                     />
                   ) : (
                     <RefreshCw className="animate-spin text-gray-300" />
                   )}
                </div>
              </div>

              <div className="flex-1 w-full space-y-3">
                <h4 className="font-semibold text-gray-700 text-center sm:text-left">Baixar QR Code</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleDownload('png')}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Download size={16} /> PNG
                  </button>
                  <button
                    onClick={() => handleDownload('svg')}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Download size={16} /> SVG
                  </button>
                </div>
                <p className="text-xs text-gray-400 text-center sm:text-left">
                  Alta resolução • 720x720px
                </p>
              </div>
            </div>
          </div>
        )}

        {!generatedLink && (
           <div className="pt-8 pb-4 text-center text-gray-400 border-t border-gray-100 border-dashed z-0">
             <div className="mx-auto w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-2">
               <Phone size={24} className="text-gray-300" />
             </div>
             <p className="text-sm">Preencha o número para visualizar o resultado</p>
           </div>
        )}

        <div className="text-center pt-2">
          <p className="text-xs text-gray-400">
            Gerador de Links e QR Codes by <span className="font-bold text-zap-blue-dark">Ikatec</span>
          </p>
        </div>
      </div>
    </div>
  );
};
