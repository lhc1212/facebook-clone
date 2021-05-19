function SidebarRow({ src, Icon, title }) {
    return (
        <div className="flex items-center space-x-2 p-4 hover:bg-gray-200 rounded-xl cursor-pointer">
            {src && (
                <img
                    className="rounded-full w-[40px] h-[40px]"
                    src={src}
                    layout="fixed"
                />
            )}

            {Icon && (
                <Icon className="h-8 w-8 text-blue-500" />
            )}

            <p className="hidden sm:inline-flex font-medium">{title}</p>
        </div>
    )
}

export default SidebarRow
