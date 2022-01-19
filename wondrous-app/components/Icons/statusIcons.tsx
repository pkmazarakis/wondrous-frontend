export const TodoIcon = (props) => {
  const { style } = props
  return (
    <svg
      style={style}
      width={style?.width || '29'}
      height={style?.height || '29'}
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="14.269"
        cy="14.3667"
        r="13.5"
        fill="#0F0F0F"
        stroke="#474747"
      />
      <circle
        cx="14.2726"
        cy="14.3664"
        r="2.94888"
        fill="url(#paint0_linear_3171_46659)"
      />
      <circle
        cx="14.4956"
        cy="14.3667"
        r="8"
        stroke="url(#paint1_linear_3171_46659)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="2.2 4"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3171_46659"
          x1="16.9132"
          y1="7.5871"
          x2="13.9643"
          y2="17.3802"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#474747" />
          <stop offset="1" stopColor="#181818" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_3171_46659"
          x1="21.6592"
          y1="-4.02473"
          x2="13.6592"
          y2="22.5429"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#F93701" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export const InProgressIcon = (props) => {
  const { style } = props

  return (
    <svg
      style={style}
      width={style?.width || '29'}
      height={style?.height || '29'}
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="14.269"
        cy="14.8218"
        r="13.5"
        fill="#0F0F0F"
        stroke="#474747"
      />
      <circle
        cx="14.2648"
        cy="14.8209"
        r="2.94888"
        fill="url(#paint0_linear_3171_45714)"
      />
      <path
        d="M14.256 5.96396C14.0607 5.96701 13.8746 6.04742 13.7385 6.18753C13.6025 6.32765 13.5275 6.51602 13.5302 6.71131V9.66042C13.5288 9.75812 13.5469 9.85512 13.5833 9.94578C13.6197 10.0364 13.6738 10.119 13.7424 10.1885C13.811 10.2581 13.8928 10.3134 13.9829 10.3511C14.0731 10.3888 14.1698 10.4082 14.2675 10.4082C14.3652 10.4082 14.4619 10.3888 14.5521 10.3511C14.6422 10.3134 14.724 10.2581 14.7926 10.1885C14.8612 10.119 14.9152 10.0364 14.9517 9.94578C14.9881 9.85512 15.0062 9.75812 15.0048 9.66042V6.71131C15.0061 6.61267 14.9877 6.51477 14.9505 6.42339C14.9133 6.33201 14.8582 6.24902 14.7884 6.17933C14.7185 6.10964 14.6355 6.05467 14.544 6.01768C14.4526 5.98068 14.3546 5.96242 14.256 5.96396ZM18.334 7.05115C18.2018 7.05023 18.0717 7.08489 17.9574 7.15153C17.8432 7.21816 17.7489 7.3143 17.6846 7.42987L16.21 9.98298C16.157 10.0669 16.1215 10.1607 16.1055 10.2587C16.0896 10.3567 16.0937 10.4569 16.1174 10.5533C16.1412 10.6497 16.1841 10.7403 16.2438 10.8197C16.3034 10.8991 16.3784 10.9657 16.4644 11.0153C16.5504 11.065 16.6455 11.0968 16.7441 11.1088C16.8426 11.1209 16.9426 11.1129 17.038 11.0853C17.1334 11.0577 17.2222 11.0112 17.2992 10.9485C17.3761 10.8858 17.4396 10.8081 17.4859 10.7203L18.9604 8.16715C19.0271 8.0557 19.0632 7.92862 19.065 7.79875C19.0668 7.66888 19.0343 7.54083 18.9707 7.42757C18.9072 7.31431 18.8148 7.21985 18.703 7.15375C18.5912 7.08766 18.4639 7.05226 18.334 7.05115ZM10.1793 7.05259C10.0515 7.05753 9.9272 7.09563 9.81856 7.16315C9.70992 7.23067 9.62071 7.32529 9.5597 7.43772C9.4987 7.55015 9.46799 7.67651 9.47059 7.8044C9.47319 7.93229 9.50902 8.0573 9.57455 8.16715L11.0491 10.7203C11.0953 10.8081 11.1588 10.8858 11.2358 10.9485C11.3128 11.0112 11.4016 11.0577 11.497 11.0853C11.5924 11.1129 11.6924 11.1209 11.7909 11.1088C11.8895 11.0968 11.9846 11.065 12.0706 11.0153C12.1565 10.9657 12.2316 10.8991 12.2912 10.8197C12.3508 10.7403 12.3938 10.6497 12.4176 10.5533C12.4413 10.4569 12.4454 10.3567 12.4295 10.2587C12.4135 10.1607 12.378 10.0669 12.3249 9.98298L10.8504 7.42987C10.7841 7.31127 10.6864 7.21328 10.568 7.14671C10.4496 7.08013 10.3151 7.04756 10.1793 7.05259ZM7.26336 10.0233C7.23887 10.0226 7.21436 10.023 7.18992 10.0247C7.03097 10.0347 6.87951 10.0958 6.75818 10.1989C6.63686 10.3021 6.55219 10.4418 6.51686 10.5971C6.48152 10.7523 6.49741 10.9149 6.56215 11.0604C6.62689 11.2059 6.737 11.3265 6.876 11.4043L9.42911 12.8788C9.51304 12.9319 9.60682 12.9674 9.70483 12.9833C9.80284 12.9992 9.90305 12.9952 9.99945 12.9714C10.0959 12.9477 10.1865 12.9047 10.2659 12.8451C10.3453 12.7855 10.4118 12.7104 10.4615 12.6244C10.5111 12.5385 10.5429 12.4434 10.555 12.3448C10.567 12.2462 10.559 12.1463 10.5314 12.0509C10.5039 11.9555 10.4573 11.8666 10.3946 11.7897C10.3319 11.7127 10.2543 11.6492 10.1664 11.603L7.61328 10.1284C7.50731 10.0646 7.38697 10.0284 7.26336 10.0233ZM21.3235 10.0247C21.1824 10.0201 21.0429 10.0561 20.9217 10.1284L18.3686 11.603C18.2807 11.6492 18.2031 11.7127 18.1404 11.7897C18.0776 11.8666 18.0311 11.9555 18.0036 12.0509C17.976 12.1463 17.968 12.2462 17.98 12.3448C17.992 12.4434 18.0238 12.5385 18.0735 12.6244C18.1232 12.7104 18.1897 12.7855 18.2691 12.8451C18.3485 12.9047 18.4391 12.9477 18.5355 12.9714C18.6319 12.9952 18.7321 12.9992 18.8302 12.9833C18.9282 12.9674 19.0219 12.9319 19.1059 12.8788L21.659 11.4043C21.7991 11.3254 21.9096 11.2029 21.9737 11.0555C22.0378 10.908 22.0519 10.7436 22.0139 10.5874C21.9759 10.4311 21.8879 10.2916 21.7632 10.19C21.6386 10.0885 21.4842 10.0304 21.3235 10.0247ZM6.15745 14.0841C6.05975 14.0827 5.96275 14.1008 5.87209 14.1372C5.78143 14.1736 5.69891 14.2277 5.62933 14.2963C5.55976 14.3649 5.50451 14.4466 5.4668 14.5368C5.42909 14.6269 5.40967 14.7237 5.40967 14.8214C5.40967 14.9191 5.42909 15.0158 5.4668 15.1059C5.50451 15.1961 5.55976 15.2778 5.62933 15.3464C5.69891 15.415 5.78143 15.4691 5.87209 15.5055C5.96275 15.542 6.05975 15.56 6.15745 15.5586H9.10655C9.20425 15.56 9.30125 15.542 9.39191 15.5055C9.48257 15.4691 9.56509 15.415 9.63467 15.3464C9.70424 15.2778 9.75949 15.1961 9.7972 15.1059C9.83491 15.0158 9.85433 14.9191 9.85433 14.8214C9.85433 14.7237 9.83491 14.6269 9.7972 14.5368C9.75949 14.4466 9.70424 14.3649 9.63467 14.2963C9.56509 14.2277 9.48257 14.1736 9.39191 14.1372C9.30125 14.1008 9.20425 14.0827 9.10655 14.0841H6.15745ZM19.4284 14.0841C19.3307 14.0827 19.2337 14.1008 19.1431 14.1372C19.0524 14.1736 18.9699 14.2277 18.9003 14.2963C18.8307 14.3649 18.7755 14.4466 18.7378 14.5368C18.7001 14.6269 18.6807 14.7237 18.6807 14.8214C18.6807 14.9191 18.7001 15.0158 18.7378 15.1059C18.7755 15.1961 18.8307 15.2778 18.9003 15.3464C18.9699 15.415 19.0524 15.4691 19.1431 15.5055C19.2337 15.542 19.3307 15.56 19.4284 15.5586H22.3775C22.4752 15.56 22.5722 15.542 22.6629 15.5055C22.7536 15.4691 22.8361 15.415 22.9057 15.3464C22.9752 15.2778 23.0305 15.1961 23.0682 15.1059C23.1059 15.0158 23.1253 14.9191 23.1253 14.8214C23.1253 14.7237 23.1059 14.6269 23.0682 14.5368C23.0305 14.4466 22.9752 14.3649 22.9057 14.2963C22.8361 14.2277 22.7536 14.1736 22.6629 14.1372C22.5722 14.1008 22.4752 14.0827 22.3775 14.0841H19.4284ZM18.756 16.6588C18.7315 16.6581 18.707 16.6585 18.6825 16.6602C18.5236 16.6701 18.3721 16.7313 18.2508 16.8344C18.1294 16.9376 18.0448 17.0773 18.0094 17.2325C17.9741 17.3878 17.99 17.5504 18.0547 17.6959C18.1195 17.8414 18.2296 17.962 18.3686 18.0397L20.9217 19.5143C21.0056 19.5673 21.0994 19.6029 21.1974 19.6188C21.2954 19.6347 21.3956 19.6307 21.492 19.6069C21.5885 19.5832 21.6791 19.5402 21.7585 19.4806C21.8378 19.4209 21.9044 19.3459 21.9541 19.2599C22.0037 19.174 22.0355 19.0788 22.0476 18.9803C22.0596 18.8817 22.0516 18.7818 22.024 18.6864C21.9965 18.591 21.9499 18.5021 21.8872 18.4252C21.8245 18.3482 21.7468 18.2847 21.659 18.2385L19.1059 16.7639C18.9999 16.7001 18.8796 16.6639 18.756 16.6588ZM9.83087 16.6602C9.68979 16.6556 9.55035 16.6916 9.42911 16.7639L6.876 18.2385C6.78813 18.2847 6.71051 18.3482 6.64778 18.4252C6.58505 18.5021 6.53852 18.591 6.51096 18.6864C6.4834 18.7818 6.4754 18.8817 6.48742 18.9803C6.49944 19.0788 6.53125 19.174 6.58093 19.2599C6.63061 19.3459 6.69714 19.4209 6.77653 19.4806C6.85592 19.5402 6.94653 19.5832 7.04294 19.6069C7.13935 19.6307 7.23956 19.6347 7.33756 19.6188C7.43557 19.6029 7.52935 19.5673 7.61328 19.5143L10.1664 18.0397C10.3065 17.9609 10.417 17.8384 10.4811 17.6909C10.5452 17.5435 10.5593 17.3791 10.5213 17.2229C10.4833 17.0666 10.3953 16.9271 10.2706 16.8255C10.146 16.724 9.99156 16.6659 9.83087 16.6602ZM11.6985 18.5437C11.5663 18.5428 11.4362 18.5775 11.3219 18.6441C11.2077 18.7108 11.1134 18.8069 11.0491 18.9225L9.57455 21.4756C9.52151 21.5595 9.48596 21.6533 9.47004 21.7513C9.45412 21.8493 9.45816 21.9495 9.48192 22.0459C9.50567 22.1423 9.54865 22.2329 9.60828 22.3123C9.66791 22.3917 9.74296 22.4582 9.82892 22.5079C9.91489 22.5576 10.01 22.5894 10.1086 22.6014C10.2071 22.6135 10.3071 22.6054 10.4025 22.5779C10.4979 22.5503 10.5867 22.5038 10.6637 22.4411C10.7406 22.3783 10.8042 22.3007 10.8504 22.2129L12.3249 19.6597C12.3916 19.5483 12.4277 19.4212 12.4295 19.2913C12.4313 19.1615 12.3988 19.0334 12.3352 18.9202C12.2717 18.8069 12.1793 18.7124 12.0675 18.6463C11.9557 18.5802 11.8284 18.5449 11.6985 18.5437ZM16.8148 18.5452C16.687 18.5501 16.5627 18.5882 16.454 18.6557C16.3454 18.7233 16.2562 18.8179 16.1952 18.9303C16.1342 19.0427 16.1035 19.1691 16.1061 19.297C16.1087 19.4249 16.1445 19.5499 16.21 19.6597L17.6846 22.2129C17.7308 22.3007 17.7943 22.3783 17.8713 22.4411C17.9483 22.5038 18.0371 22.5503 18.1325 22.5779C18.2279 22.6054 18.3279 22.6135 18.4264 22.6014C18.525 22.5894 18.6201 22.5576 18.7061 22.5079C18.792 22.4582 18.8671 22.3917 18.9267 22.3123C18.9863 22.2329 19.0293 22.1423 19.0531 22.0459C19.0768 21.9495 19.0809 21.8493 19.0649 21.7513C19.049 21.6533 19.0135 21.5595 18.9604 21.4756L17.4859 18.9225C17.4196 18.8039 17.3219 18.7059 17.2035 18.6393C17.0851 18.5727 16.9506 18.5402 16.8148 18.5452ZM14.256 19.2349C14.0607 19.238 13.8746 19.3184 13.7385 19.4585C13.6025 19.5986 13.5275 19.787 13.5302 19.9823V22.9314C13.5288 23.0291 13.5469 23.1261 13.5833 23.2168C13.6197 23.3074 13.6738 23.3899 13.7424 23.4595C13.811 23.5291 13.8928 23.5843 13.9829 23.6221C14.0731 23.6598 14.1698 23.6792 14.2675 23.6792C14.3652 23.6792 14.4619 23.6598 14.5521 23.6221C14.6422 23.5843 14.724 23.5291 14.7926 23.4595C14.8612 23.3899 14.9152 23.3074 14.9517 23.2168C14.9881 23.1261 15.0062 23.0291 15.0048 22.9314V19.9823C15.0061 19.8837 14.9877 19.7858 14.9505 19.6944C14.9133 19.603 14.8582 19.52 14.7884 19.4503C14.7185 19.3806 14.6355 19.3257 14.544 19.2887C14.4526 19.2517 14.3546 19.2334 14.256 19.2349Z"
        fill="url(#paint1_linear_3171_45714)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3171_45714"
          x1="16.9054"
          y1="8.04169"
          x2="13.9565"
          y2="17.8348"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#474747" />
          <stop offset="1" stopColor="#181818" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_3171_45714"
          x1="14.2675"
          y1="5.96387"
          x2="14.2675"
          y2="23.6792"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#FFD653" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export const InReviewIcon = (props) => {
  const { style } = props

  return (
    <svg
      style={style}
      width={style?.width || '29'}
      height={style?.height || '29'}
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="14.269"
        cy="14.8662"
        r="13.5"
        fill="#0F0F0F"
        stroke="#474747"
      />
      <circle
        cx="14.4946"
        cy="14.8653"
        r="7.99904"
        fill="url(#paint0_linear_3171_44328)"
      />
      <circle
        cx="11.1583"
        cy="14.8663"
        r="0.990845"
        fill="url(#paint1_linear_3171_44328)"
      />
      <circle
        cx="14.2677"
        cy="14.8663"
        r="0.990845"
        fill="url(#paint2_linear_3171_44328)"
      />
      <circle
        cx="17.3771"
        cy="14.8663"
        r="0.990845"
        fill="url(#paint3_linear_3171_44328)"
      />
      <circle
        cx="14.269"
        cy="14.8662"
        r="8"
        stroke="url(#paint4_linear_3171_44328)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeDasharray="3.2 3.2"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3171_44328"
          x1="21.6574"
          y1="-3.52397"
          x2="13.6584"
          y2="23.0405"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#474747" />
          <stop offset="1" stopColor="#181818" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_3171_44328"
          x1="11.1583"
          y1="13.8755"
          x2="11.1583"
          y2="15.8572"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#00BAFF" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_3171_44328"
          x1="14.2677"
          y1="13.8755"
          x2="14.2677"
          y2="15.8572"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#00BAFF" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_3171_44328"
          x1="17.3771"
          y1="13.8755"
          x2="17.3771"
          y2="15.8572"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#00BAFF" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_3171_44328"
          x1="14.269"
          y1="6.86621"
          x2="14.269"
          y2="22.8662"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#00BAFF" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export const CompletedIcon = (props) => {
  const { style } = props

  return (
    <svg
      style={style}
      width={style?.width || '29'}
      height={style?.height || '29'}
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="14.269"
        cy="14.6812"
        r="13.5"
        fill="#0F0F0F"
        stroke="#474747"
      />
      <circle
        cx="14.4946"
        cy="14.6802"
        r="7.99904"
        fill="url(#paint0_linear_3171_42748)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.92197 14.6824C6.92197 10.6239 10.212 7.33384 14.2705 7.33384C18.329 7.33384 21.6191 10.6239 21.6191 14.6824C21.6191 18.7409 18.329 22.031 14.2705 22.031C10.212 22.031 6.92197 18.7409 6.92197 14.6824ZM14.2705 5.93384C9.43884 5.93384 5.52197 9.8507 5.52197 14.6824C5.52197 19.5141 9.43884 23.431 14.2705 23.431C19.1022 23.431 23.0191 19.5141 23.0191 14.6824C23.0191 9.8507 19.1022 5.93384 14.2705 5.93384ZM16.8227 11.7557C16.9883 11.5853 17.2136 11.486 17.4511 11.479C17.6352 11.4735 17.8166 11.5238 17.9717 11.6233C18.1267 11.7228 18.248 11.8668 18.3198 12.0364C18.3916 12.206 18.4105 12.3934 18.3739 12.5739C18.3374 12.7544 18.2472 12.9197 18.1151 13.0481L13.5452 17.618C13.3738 17.7893 13.1414 17.8856 12.899 17.8856C12.6567 17.8856 12.4242 17.7893 12.2528 17.618L10.4249 15.79C10.3371 15.7058 10.2671 15.6049 10.2189 15.4933C10.1706 15.3817 10.1451 15.2615 10.1439 15.14C10.1427 15.0184 10.1657 14.8977 10.2117 14.7852C10.2576 14.6726 10.3256 14.5703 10.4116 14.4843C10.4976 14.3983 10.5998 14.3304 10.7124 14.2844C10.825 14.2384 10.9456 14.2154 11.0672 14.2166C11.1888 14.2179 11.3089 14.2434 11.4206 14.2916C11.5322 14.3398 11.6331 14.4099 11.7173 14.4976L12.899 15.6793L16.8227 11.7557Z"
        fill="url(#paint1_linear_3171_42748)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3171_42748"
          x1="21.6574"
          y1="-3.70903"
          x2="13.6584"
          y2="22.8554"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#474747" />
          <stop offset="1" stopColor="#181818" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_3171_42748"
          x1="14.2705"
          y1="5.93384"
          x2="14.2705"
          y2="23.431"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#06FFA5" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export const ArchivedIcon = (props) => {
  const { style } = props
  return (
    <svg
      style={style}
      width={style?.width || '29'}
      height={style?.height || '29'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="14" cy="14" r="13.5" fill="#0F0F0F" stroke="#474747" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.85938 20.7059V11.8353H6.49219V8.42285H21.507V11.8353H20.1442V20.7059H7.85938Z"
        fill="url(#paint0_linear_3171_49207)"
      />
      <path
        d="M20.1442 11.8325V20.7049H7.85938V11.8325"
        stroke="#7A7A7A"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.1672 14.0896C16.0056 14.0944 15.8523 14.162 15.7396 14.2779L13.07 16.9476L12.2659 16.1435C12.2086 16.0838 12.1399 16.0362 12.064 16.0034C11.988 15.9705 11.9063 15.9532 11.8236 15.9523C11.7408 15.9515 11.6588 15.9672 11.5822 15.9985C11.5056 16.0297 11.436 16.076 11.3775 16.1345C11.319 16.193 11.2727 16.2626 11.2415 16.3392C11.2102 16.4158 11.1945 16.4978 11.1953 16.5806C11.1962 16.6633 11.2135 16.7451 11.2464 16.821C11.2792 16.897 11.3268 16.9656 11.3865 17.0229L12.6303 18.2666C12.7469 18.3832 12.905 18.4487 13.07 18.4487C13.2349 18.4487 13.393 18.3832 13.5096 18.2666L16.619 15.1573C16.7089 15.0699 16.7703 14.9574 16.7951 14.8346C16.82 14.7118 16.8071 14.5843 16.7583 14.4689C16.7094 14.3535 16.6269 14.2555 16.5214 14.1878C16.4159 14.1202 16.2925 14.0859 16.1672 14.0896Z"
        fill="#7A7A7A"
      />
      <path
        d="M21.507 8.42188H6.49219V11.8343H21.507V8.42188Z"
        stroke="#7A7A7A"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3171_49207"
          x1="20.7221"
          y1="6.20662"
          x2="20.3012"
          y2="12.3578"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#474747" />
          <stop offset="1" stopColor="#181818" />
        </linearGradient>
      </defs>
    </svg>
  )
}