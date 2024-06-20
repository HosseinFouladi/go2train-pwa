type PopupTypeCode = 'CODE'
type PopupTypeToken = 'TOKEN'
type PopupTypes = PopupTypeCode | PopupTypeToken

declare type ClientId = string | null
declare type Context = 'signin' | 'signup' | 'use'

interface IdConfiguration {
  /**Your Google API client ID */
  client_id?: ClientId
  /** Enables automatic selection on Google One Tap */
  auto_select?: boolean
  /** ID token callback handler */
  callback?: Function
  /** The Sign In With Google button UX flow */
  ux_mode?: 'popup' | 'redirect'
  /** The URL of your login endpoint */
  login_uri?: string
  /** The URL of your password credential handler endpoint */
  native_login_uri?: string
  /** The JavaScript password credential handler function name */
  native_callback?: (response: { id: string; password: string }) => void
  /** Controls whether to cancel the prompt if the user clicks outside of the prompt */
  cancel_on_tap_outside?: boolean
  /** The DOM ID of the One Tap prompt container element */
  prompt_parent_id?: string
  /** A random string for ID tokens */
  nonce?: string
  /** The title and words in the One Tap prompt */
  context?: Context
  /** If you need to call One Tap in the parent domain and its subdomains, pass the parent domain to this attribute so that a single shared cookie is used. */
  state_cookie_domain?: string
  /** The origins that are allowed to embed the intermediate iframe. One Tap will run in the intermediate iframe mode if this attribute presents */
  allowed_parent_origin?: string | string[]
  /**	Allow the browser to control user sign-in prompts and mediate the sign-in flow between your website and Google. Defaults to false. */
  use_fedcm_for_prompt?: boolean
  /**	Overrides the default intermediate iframe behavior when users manually close One Tap */
  intermediate_iframe_close_callback?: () => void
  /** Enables upgraded One Tap UX on ITP browsers */
  itp_support?: boolean
  /**
   * If your application knows the Workspace domain the user belongs to,
   * use this to provide a hint to Google. For more information,
   * see the [hd](https://developers.google.com/identity/protocols/oauth2/openid-connect#authenticationuriparameters)
   * field in the OpenID Connect docs.
   */
  hosted_domain?: string
}

interface ButtonConfig {
  /** The button [type](https://developers.google.com/identity/gsi/web/reference/js-reference#type): icon, or standard button */
  type?: 'standard' | 'icon'
  /** The button [theme](https://developers.google.com/identity/gsi/web/reference/js-reference#theme). For example, filled_blue or filled_black */
  theme?: 'outline' | 'filled_blue' | 'filled_black'
  /** The button [size](https://developers.google.com/identity/gsi/web/reference/js-reference#size). For example, small or large */
  size?: 'large' | 'medium' | 'small'
  /** The button [text](https://developers.google.com/identity/gsi/web/reference/js-reference#text). For example, "Sign in with Google" or "Sign up with Google" */
  text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin'
  /**	The button [shape](https://developers.google.com/identity/gsi/web/reference/js-reference#shape). For example, rectangular or circular */
  shape?: 'rectangular' | 'pill' | 'circle' | 'square'
  /**	The Google [logo alignment](https://developers.google.com/identity/gsi/web/reference/js-reference#logo_alignment): left or center */
  logo_alignment?: 'left' | 'center'
  /** The button [width](https://developers.google.com/identity/gsi/web/reference/js-reference#width), in pixels */
  width?: string
  /** If set, then the button [language](https://developers.google.com/identity/gsi/web/reference/js-reference#locale) is rendered */
  locale?: string
}

export interface GoogleLoginOptions {
  clientId?: string | undefined
  prompt?: boolean
  autoLogin?: boolean
  popupType?: PopupTypes
  idConfiguration?: IdConfiguration | null
  buttonConfig?: ButtonConfig
  callback?: Function
  error?: Function | null
}
