import React from "react";
import { X, Globe, MapPin, Phone, Shield, HelpCircle } from "lucide-react";

interface ContactProviderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactProviderModal({
  isOpen,
  onClose,
}: ContactProviderModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-lg sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            Contact Provider
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 sm:p-4">
          <p className="text-gray-700 mb-4 sm:mb-6 text-sm">
            Contact the provider to let them know you'd like an estimate. The
            finance or billing department is often best equipped to help verify
            expected costs.
          </p>

          <div className="border border-gray-200 rounded-lg p-3 mb-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="bg-teal-600 p-2 rounded-lg">
                <HelpCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-base font-semibold mb-1">Bronchoscopy</h3>
                <p className="text-gray-600 text-sm">31623</p>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-3 mb-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="border-2 p-2 rounded-lg">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold mb-1">
                  Kingsbrook Jewish Medical Center
                </h3>
                <p className="text-gray-600 text-sm">
                  585 Schenectady Avenue, Brooklyn, NY 11203
                </p>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-3 mb-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="bg-white p-2 border-2 rounded-lg">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold mb-1">
                  Anthem NY (Empire) PPO
                </h3>
                <p className="text-gray-600 text-sm">Insurance</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-3 sm:p-4 mb-4">
            <div className="flex gap-2 sm:gap-3">
              <div className="flex-shrink-0">
                <Shield className="w-10 h-10 text-teal-700" />
              </div>
              <div>
                <h3 className="text-base font-semibold mb-2">
                  Your Right to Know
                </h3>
                <p className="text-gray-700 text-sm">
                  The <span className="text-teal-700">No Surprises Act</span>{" "}
                  requires healthcare providers to provide a cost estimate for
                  certain services. When speaking with your provider, you can
                  request a 'Good Faith Estimate' and have the CPT code above,
                  with your insurance information (if applicable), on hand.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <button className="flex items-center justify-center gap-2 px-3 py-2 border border-teal-700 rounded-lg text-teal-700 hover:bg-teal-50 transition-colors text-sm">
              <Globe className="w-4 h-4" />
              Website
            </button>
            <button className="flex items-center justify-center gap-2 px-3 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors text-sm">
              <Phone className="w-4 h-4" />
              (718) 604-5789
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
