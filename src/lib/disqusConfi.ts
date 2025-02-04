export const disqusConfig = (id: string) => {
    const config = {
        url: `${process.env.NEXT_PUBLIC_DISQUS_HOSTNAME}/${id}`,
        identifier: id,
        title: id
    }
    return config
};