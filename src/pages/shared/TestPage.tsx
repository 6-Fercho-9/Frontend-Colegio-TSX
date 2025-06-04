import React from 'react'
import NavigationTabs from './NavegationBar'

export const TestPage = () => {
  return (
    <>
      <NavigationTabs
        className="mb-4"
        activeClassName="border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400"
        defaultClassName="pb-2 text-sm font-semibold text-gray-700 dark:text-gray-200"
        />
        <div>TestPage</div>
    </>
  )
}
