import { useState, useEffect, useRef } from "react";

// redux
import { useSelector, useDispatch } from "react-redux";
import {
  showUserAddAddressForm,
  showUserAddressForm,
  editUserAddress,
  // setUserAddresses,
  userAddresses,
  userDataToken,
} from "../../../store/slices/userSlice";

import { cartBillingAddress, cartCountries } from "@/app/cart/store/slices/cartSlice";

// Get States
import { getStates } from "../../../../components/lib/cart/getStates";
import { saveUserNewAddress } from "@/app/components/lib/user/saveUserNewAddress";
import DotPulsePreloader from "@/app/components/ui/preloader/dotPulsePreloader";
import PhoneInput from "react-phone-input-2";
import { getUserAddress } from "@/app/components/lib/user/getUserAddress";

const SaveNewAddress = ({addressLength=0, setAddress, address }) => {
  const isFormVisible = useSelector(showUserAddressForm);
  const editFormData = useSelector(editUserAddress);
  // const userAddedAddresses = useSelector(userAddresses);
  const billingAddress = useSelector(cartBillingAddress);
  const dispatch = useDispatch();

  const userToken = useSelector(userDataToken);

  useEffect(() => {
    // if (userToken.length !== 0 && (!userAddedAddresses || userAddedAddresses.length === 0)) {
    //   showModal();
    // }
    if (userToken.length !== 0 && (!addressLength || addressLength.length === 0)) {
      showModal();
    }
  }, []);

  const closeModal = () => {
    dispatch(showUserAddAddressForm({ isVisible: false, address: {} }));
  };

  const showModal = () => {
    dispatch(showUserAddAddressForm({ isVisible: true, address: {} }));
  };

  const [errors, setErrors] = useState({});
  const [FormError, setFormError] = useState("");

  const countries = useSelector(cartCountries);
  const [states, setStates] = useState([]);
  const [submitPreloader, setSubmitPreloader] = useState(false);

  // load States
  const loadStates = async (cc = "in") => {
    setFormError("");

    if (!cc || typeof cc !== "string") {
      console.error("Invalid country code provided:", cc);
      return;
    }

    try {
      const res = await getStates(cc);

      if (res?.error) {
        setFormError(res?.error || "An error occurred while fetching states.");
        setStates([]);
      }else{
        setStates(res);
      }

    } catch (err) {
      console.error("Failed top load States");
    }
  };

  // Form Data
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    address_1: "",
    address_2: "",
    state: billingAddress?.state ?? "",
    postcode: "",
    city: "",
    country: billingAddress?.country ?? "",
    is_default: 0,
    country_ext: "91",
  });

  const handlePhoneChange = (value, data) => {
    const countryCode = data.dialCode;
    setFormData((prevData) => ({
      ...prevData,
        country_ext: countryCode,
    }));
  };

  useEffect(() => {
    window.setTimeout(() => {
        const inputCountryExt = document.getElementById('shippingFormMobileExt');
        if (inputCountryExt) {
            setFormData((prevData) => ({
                ...prevData,
                country_ext: inputCountryExt.value.replace('+', ''),
            }));
        } else {
            console.warn("Element with ID 'shippingFormMobileExt' not found.");
        }
    }, 100);
  }, [formData.country]);


  /**
   * Get Countries on Form Init
   * Check if country exist or not call countries
   * Call states with default country
   */
  useEffect(() => {
    if (isFormVisible) {
      const {
        first_name,
        last_name,
        phone,
        email,
        address_1,
        address_2,
        state,
        postcode,
        city,
        country,
        id,
        is_default,
      } = editFormData;

      setFormData((prev) => ({
        ...prev,
        id: id || "",
        first_name: first_name || "",
        last_name: last_name || "",
        email: email || "",
        address_1: address_1 || "",
        address_2: address_2 || "",
        state: state || billingAddress?.state || "",
        postcode: postcode || "",
        city: city || "",
        country: country || billingAddress?.country || "",
        is_default: is_default,
        phone: phone || "",
      }));

      window.setTimeout(()=>{
        loadStates(editFormData?.country || billingAddress?.country)
      }, 100)
    }
  }, [isFormVisible]);

  const validate = () => {
    const newErrors = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = "First Name is required";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Mobile Number is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email Address is invalid";
    }
    if (!formData.address_1.trim()) {
      newErrors.address_1 = "Address is required";
    }
    if (!formData.address_2.trim()) {
      newErrors.address_2 = "Locality is required";
    }
    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }
    if (!formData.postcode.trim()) {
      newErrors.postcode = "Pincode is required";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }
    // if (!formData.checkbox.trim()) {
    //   newErrors.checkbox = "check is required";
    // }

    setErrors(newErrors);
    return newErrors;
  };

  const validateOnblur = (fieldName) => {
    const newErrors = { ...errors };

    // Validate only the field that was blurred
    if (fieldName === "first_name" && !formData.first_name.trim()) {
      newErrors.first_name = "First Name is required";
    }
    if (fieldName === "phone" && !formData.phone.trim()) {
      newErrors.phone = "Mobile Number is required";
    }
    if (fieldName === "email") {
      if (!formData.email.trim()) {
        newErrors.email = "Email Address is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email Address is invalid";
      }
    }
    if (fieldName === "address_1" && !formData.address_1.trim()) {
      newErrors.address_1 = "Address is required";
    }
    if (fieldName === "address_2" && !formData.address_2.trim()) {
      newErrors.address_2 = "Locality is required";
    }
    if (fieldName === "state" && !formData.state.trim()) {
      newErrors.state = "State is required";
    }
    if (fieldName === "postcode" && !formData.postcode.trim()) {
      newErrors.postcode = "Pincode is required";
    }
    if (fieldName === "city" && !formData.city.trim()) {
      newErrors.city = "City is required";
    }
    if (fieldName === "country" && !formData.country.trim()) {
      newErrors.city = "Country is required";
    }

    setErrors(newErrors);
  };

  //   const handleInputChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData((prev) => ({ ...prev, [name]: value }));
  //     setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on change
  //   };
  const handleInputChange = (e) => {
    const { name, type, value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "is_default"
          ? prev.is_default === 0
            ? 1
            : 0 // Toggle 0 to 1 and 1 to 0 for "is_default"
          : type === "checkbox"
          ? checked
          : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "", // Clear the error for the input being updated
    }));
  };

  const handleBlur = (e) => {
    validateOnblur(e.target.name);
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    setFormError("");
    setSubmitPreloader(true);

    if (e && e.preventDefault) {
      e.preventDefault(); // Prevent default form submission if event exists
    }

    // Validate all fields before submitting
    const validationErrors = validate();

    // If there are validation errors, don't submit
    if (Object.keys(validationErrors).length > 0) {
      setSubmitPreloader(false);
      return;
    }

    try {
      const newAddressResponse = await saveUserNewAddress(formData);
      if (newAddressResponse?.addresses) {
        // dispatch(setUserAddresses(newAddressResponse.addresses));
        closeModal();

        try {
          // const response = await getUserAddress(userToken, userAddedAddresses?.length, 1);
          const response = await getUserAddress(userToken, addressLength, 1);
    
          if (response?.addresses) {
            // dispatch(setUserAddresses(response.addresses))
            setAddress(response.addresses);
          }
            
        } catch (error) {
            console.error("Failed to fetch updated addresses:", error);
        } finally{
        }
      } else {
        setFormError(newAddressResponse);
      }

      // console.log('new errors', newAddressResponse);
    } catch (error) {
      console.error("Failed to save address:", error);
    } finally {
      setSubmitPreloader(false);
    }
  };

  return (
    <>
      <button
        onClick={showModal}
        className={`min-h-44 flex items-center justify-center border border-[#e6e6e6] rounded-md p-4 md:p-5
                group hover:border-primary hover:text-primary font-medium transition-all
                `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          className="mr-2"
        >
          <g
            fill="primary"
            fillRule="nonzero"
            className="group-hover:fill-primary transition-all"
          >
            <path d="M8 0a1 1 0 01.993.883L9 1v14a1 1 0 01-1.993.117L7 15V1a1 1 0 011-1z"></path>
            <path d="M15 7a1 1 0 01.117 1.993L15 9H1a1 1 0 01-.117-1.993L1 7h14z"></path>
          </g>
        </svg>
        <span>Add new address</span>
      </button>

      {/* Modal */}
      {isFormVisible && (
        <div className="fixed z-50 left-0 right-0 top-0 bottom-0 w-full bg-opacity-50 bg-black flex items-end lg:items-center ">
          <div
            className="addressFormModal w-full bg-white px-4 py-6 rounded-tl-2xl rounded-tr-2xl lg:rounded-xl lg:max-w-3xl mx-auto 
                        lg:max-h-[calc(100%-60px)] lg:overflow-y-scroll scrollbar-hide"
          >
            <h3 className="text-xl pb-5 pr-8 mb-4 font-medium border-b border-b-[#DADADA80] relative">
              {editFormData?.id ? "Update address" : "Add new address"}

              <button
                className="close absolute right-0 top-1"
                onClick={closeModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                >
                  <path
                    d="M15.5 1L1.5 15M1.5 1L15.5 15"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </h3>

            <form
              className="max-h-80 lg:max-h-[100%] overflow-y-scroll scrollbar-hide"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-wrap gap-x-6">
                <div className="form-group w-full md:w-[calc(50%-12px)] flex flex-col gap-2 pb-8 relative">
                  <label
                    htmlFor="shippingFormFirstName"
                    className="text-[#4d4d4d] text-sm"
                  >
                    First Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    autoComplete="true"
                    className={`w-full py-[10px] px-4 border ${
                      errors.first_name ? "border-red-600" : "border-[#d9d9d9]"
                    } rounded-md outline-none transition-all focus:border-primary`}
                    type="text"
                    name="first_name"
                    id="shippingFormFirstName"
                    placeholder="Enter first name"
                    value={formData.first_name}
                    onBlur={handleBlur}
                    onChange={handleInputChange}
                  />

                  {errors.first_name && (
                    <small className="absolute left-0 bottom-3 text-xs text-red-600">
                      {errors.first_name}
                    </small>
                  )}
                </div>

                <div className="form-group w-full md:w-[calc(50%-12px)] flex flex-col gap-2 pb-8 relative">
                  <label
                    htmlFor="shippingFormLastName"
                    className="text-[#4d4d4d] text-sm"
                  >
                    Last Name
                  </label>
                  <input
                    className="w-full py-[10px] px-4 border border-[#d9d9d9] rounded-md outline-none transition-all focus:border-primary"
                    type="text"
                    name="last_name"
                    id="shippingFormLastName"
                    placeholder="Enter last name"
                    value={formData.last_name}
                    onBlur={handleBlur}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group w-full md:w-[calc(50%-12px)] flex flex-col gap-2 pb-8 relative">
                  <label
                    htmlFor="shippingFormMobile"
                    className="text-[#4d4d4d] text-sm"
                  >
                    Mobile Number <span className="text-red-600">*</span>
                  </label>

                  <div className="flex">
                      <PhoneInput className={`max-w-max`}
                        country={formData?.country.toLowerCase() ?? "in"}
                        inputClass={`!py-[10px] px-4 !border !text-base !h-auto !border-r-0 !rounded-br-none !rounded-tr-none !max-w-[95px] !pr-0 !w-full ${
                          errors.phone ? "!border-red-600" : "!border-[#d9d9d9]"
                        } !rounded-md !outline-none !transition-all focus:!border-primary`}
                        onChange={handlePhoneChange}
                        value={formData?.country_ext}
                        inputProps={{
                          id: "shippingFormMobileExt",
                          readOnly: true,
                        }}
                      />

                      <input
                        className={`py-[10px] px-4 pl-1 border-l-0 border text-base h-auto w-full rounded-tl-none rounded-bl-none ${
                            errors.phone ? "border-red-600" : "border-[#d9d9d9]"
                          } rounded-md outline-none transition-all focus:border-primary`}
                        type="tel"
                        name="phone"
                        id="shippingFormMobile"
                        placeholder="Enter mobile number"
                        value={formData.phone}
                        onBlur={handleBlur}
                        onChange={handleInputChange}
                      />
                  </div>

                  {errors.phone && (
                    <small className="absolute left-0 bottom-3 text-xs text-red-600">
                      {errors.phone}
                    </small>
                  )}
                </div>

                <div className="form-group w-full md:w-[calc(50%-12px)] flex flex-col gap-2 pb-8 relative">
                  <label
                    htmlFor="shippingFormEmail"
                    className="text-[#4d4d4d] text-sm"
                  >
                    Email Address <span className="text-red-600">*</span>
                  </label>

                  <input
                    className={`w-full py-[10px] px-4 border ${
                      errors.email ? "border-red-600" : "border-[#d9d9d9]"
                    } rounded-md outline-none transition-all focus:border-primary`}
                    type="email"
                    name="email"
                    id="shippingFormEmail"
                    placeholder="Enter email"
                    value={formData.email}
                    onBlur={handleBlur}
                    onChange={handleInputChange}
                  />

                  {errors.email && (
                    <small className="absolute left-0 bottom-3 text-xs text-red-600">
                      {errors.email}
                    </small>
                  )}
                </div>

                <div className="form-group w-full flex flex-col gap-2 pb-8 relative">
                  <label
                    htmlFor="shippingFormAddress"
                    className="text-[#4d4d4d] text-sm"
                  >
                    Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    className={`w-full py-[10px] px-4 border ${
                      errors.address_1 ? "border-red-600" : "border-[#d9d9d9]"
                    } rounded-md outline-none transition-all focus:border-primary`}
                    type="text"
                    name="address_1"
                    id="shippingFormAddress"
                    placeholder="Enter address"
                    value={formData.address_1}
                    onBlur={handleBlur}
                    onChange={handleInputChange}
                  />

                  {errors.address_1 && (
                    <small className="absolute left-0 bottom-3 text-xs text-red-600">
                      {errors.address_1}
                    </small>
                  )}
                </div>

                <div className="form-group w-full md:w-[calc(50%-12px)] flex flex-col gap-2 pb-8 relative">
                  <label
                    htmlFor="shippingFormLocality"
                    className="text-[#4d4d4d] text-sm"
                  >
                    Locality / Area <span className="text-red-600">*</span>
                  </label>
                  <input
                    className={`w-full py-[10px] px-4 border ${
                      errors.address_2 ? "border-red-600" : "border-[#d9d9d9]"
                    } rounded-md outline-none transition-all focus:border-primary`}
                    type="text"
                    name="address_2"
                    id="shippingFormLocality"
                    placeholder="Enter locality/area"
                    value={formData.address_2}
                    onBlur={handleBlur}
                    onChange={handleInputChange}
                  />

                  {errors.address_2 && (
                    <small className="absolute left-0 bottom-3 text-xs text-red-600">
                      {errors.address_2}
                    </small>
                  )}
                </div>

                <div className="form-group w-full md:w-[calc(50%-12px)] flex flex-col gap-2 pb-8 relative">
                  <label
                    htmlFor="shippingFormLandmark"
                    className="text-[#4d4d4d] text-sm"
                  >
                    Landmark (optional)
                  </label>
                  <input
                    className="w-full py-[10px] px-4 border border-[#d9d9d9] rounded-md outline-none transition-all focus:border-primary"
                    type="text"
                    name="landmark"
                    id="shippingFormLandmark"
                    placeholder="Enter landmark"
                  />
                </div>

                <div className="form-group w-full md:w-[calc(50%-12px)] flex flex-col gap-2 pb-8 relative">
                  <label
                    htmlFor="shippingFormPincode"
                    className="text-[#4d4d4d] text-sm"
                  >
                    Pincode <span className="text-red-600">*</span>
                  </label>

                  <input
                    className={`w-full py-[10px] px-4 border ${
                      errors.postcode ? "border-red-600" : "border-[#d9d9d9]"
                    } rounded-md outline-none transition-all focus:border-primary`}
                    type="number"
                    name="postcode"
                    id="shippingFormPincode"
                    placeholder="Enter postcode"
                    value={formData.postcode}
                    onBlur={handleBlur}
                    onChange={handleInputChange}
                  />

                  {errors.postcode && (
                    <small className="absolute left-0 bottom-3 text-xs text-red-600">
                      {errors.postcode}
                    </small>
                  )}
                </div>

                <div className="form-group w-full md:w-[calc(50%-12px)] flex flex-col gap-2 pb-8 relative">
                  <label
                    htmlFor="shippingFormCity"
                    className="text-[#4d4d4d] text-sm"
                  >
                    City <span className="text-red-600">*</span>
                  </label>

                  <input
                    className={`w-full py-[10px] px-4 border ${
                      errors.city ? "border-red-600" : "border-[#d9d9d9]"
                    } rounded-md outline-none transition-all focus:border-primary`}
                    type="text"
                    name="city"
                    id="shippingFormCity"
                    placeholder="Enter city"
                    value={formData.city}
                    onBlur={handleBlur}
                    onChange={handleInputChange}
                  />

                  {errors.city && (
                    <small className="absolute left-0 bottom-3 text-xs text-red-600">
                      {errors.city}
                    </small>
                  )}
                </div>

                <div className="form-group w-full md:w-[calc(50%-12px)] flex flex-col gap-2 pb-8 relative">
                  <label
                    htmlFor="shippingFormCountries"
                    className="text-[#4d4d4d] text-sm"
                  >
                    Country <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="country"
                    id="shippingFormCountries"
                    className={`py-[10px] px-4 border ${
                      errors.country ? "border-red-600" : "border-[#d9d9d9]"
                    } rounded-md outline-none transition-all focus:border-primary`}
                    value={formData.country}
                    onBlur={handleBlur}
                    onChange={(e) => {
                      loadStates(e.target.value);
                      handleInputChange(e);
                    }}
                  >
                    <option value="" hidden defaultValue={true}>
                      Select country
                    </option>
                    {countries &&
                      Object.keys(countries).length > 0 &&
                      Object.entries(countries).map(([code, name]) => (
                        <option key={`countryCode-${code}`} value={code}>
                          {name}
                        </option>
                      ))}
                  </select>
                  {errors.country && (
                    <small className="absolute left-0 bottom-3 text-xs text-red-600">
                      {errors.country}
                    </small>
                  )}
                </div>

                {
                  Object.keys(states).length > 0 && (
                    <div className="form-group w-full md:w-[calc(50%-12px)] flex flex-col gap-2 pb-8 relative">
                      <label
                        htmlFor="shippingFormState"
                        className="text-[#4d4d4d] text-sm"
                      >
                        State <span className="text-red-600">*</span>
                      </label>
                      <select
                        name="state"
                        id="shippingFormState"
                        className={`py-[10px] px-4 border ${
                          errors.state ? "border-red-600" : "border-[#d9d9d9]"
                        } rounded-md outline-none transition-all focus:border-primary`}
                        value={formData.state}
                        onBlur={handleBlur}
                        onChange={handleInputChange}
                      >
                        <option value="" hidden defaultValue={true}>
                          Select State
                        </option>
                        {states &&
                          Object.keys(states).length > 0 &&
                          Object.entries(states).map(([code, name]) => (
                            <option key={`stateCode-${code}`} value={code}>
                              {name}
                            </option>
                          ))}
                      </select>
                      {errors.state && (
                        <small className="absolute left-0 bottom-3 text-xs text-red-600">
                          {errors.state}
                        </small>
                      )}
                    </div>
                  )
                }
                <div className="form-group w-full flex flex-col gap-2 pb-8 relative">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="is_default"
                      id="is_default"
                      checked={formData.is_default === 1} // Checkbox is checked if value is 1
                      onChange={handleInputChange}
                      className="h-4 w-4 border-gray-300 rounded text-primary focus:ring-primary transition-all accent-primary"
                    />
                    <label
                      htmlFor="is_default"
                      className="text-[#4d4d4d] text-sm"
                    >
                      Make it default (optional)
                    </label>

                    <span className="text-sm text-[#4d4d4d]">
                      {/* Simple Checkbox */}
                    </span>
                  </div>
                </div>

                {FormError && (
                  <div className="form-group w-full text-sm text-red-600 pb-8">
                    {FormError}
                  </div>
                )}

                <div className="form-group text-center w-full relative">
                  <button
                    type="submit"
                    className={`bg-primary hover:bg-primary-hover py-3 px-8 rounded-lg font-medium text-base
                                            disabled:opacity-50 transition-bg ${
                                              submitPreloader
                                                ? "text-primary hover:text-primary-hover"
                                                : "text-white"
                                            }`}
                    disabled={submitPreloader}
                  >
                    {editFormData?.id ? "Update address" : "Add address"}

                    {submitPreloader && (
                      <div className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <DotPulsePreloader color={"#ffffff"} />
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SaveNewAddress;
